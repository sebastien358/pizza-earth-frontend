'use client';

import styles from './AddReview.module.scss';

import Image from "next/image";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ReviewFormData, useReviewStore} from "@/store/review.store";
import {ChangeEvent, useEffect, useState} from 'react';
import {z} from 'zod';

const DELAY_TIMEOUT = 2000

const PIZZAS = [
    'Aubergine Grillée',
    'Chèvre Miel',
    'Reine',
    'Diavola',
    'Quatre Fromages',
    'Burrata',
    'Champignon Truffe',
    'Jardin Végétarien',
    'Margherita',
    'Napolitaine',
    'Pepperoni',
    'Campagnarde',
    'Carbonara',
    'Chorizo',
    'Hawaïenne',
    'Saumon Fumé',
];

const FILE_SIZE = 2 * 1024 * 1024;
const FILE_ACCEPT = ['image/jpeg', 'image/png', 'image/webp'];

const schema = z.object({
    rating: z.coerce
        .number({ message: 'Choisissez une note' })
        .int()
        .min(1, { message: 'Choisissez une note' })
        .max(5, { message: 'Note invalide' }),
    name: z
        .string()
        .min(1, { message: 'Le nom est obligatoire' })
        .max(50, { message: '50 caractères maximum' }),
    picture: z
        .instanceof(File)
        .refine((f) => f.size <= FILE_SIZE, { message: 'Image trop lourde (2 Mo max)' })
        .refine((f) => FILE_ACCEPT.includes(f.type), { message: 'Formats acceptés : JPG, PNG, WEBP' })
        .optional(),
    pizza: z.string().min(1, { message: 'Choisissez une pizza' }),
    message: z
        .string()
        .min(10, { message: '30 caractères minimum' })
        .max(300, { message: '300 caractères maximum' }),
});

export default function AddReview() {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(5);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open]);

    {/* Gestion de la photo client dans le formaulaire */}

    const [preview, setPreview] = useState<string | null>(null);
    const [photoError, setPhotoError] = useState<string | null>(null);

    function onPhotoChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) return setPhotoError('Le fichier doit être une image.');
        if (file.size > 2 * 1024 * 1024) return setPhotoError('Image trop lourde (2 Mo max).');
        setPhotoError('');
        setPreview(URL.createObjectURL(file))
        setValue('picture', file, { shouldValidate: true })
    }

    function removePhoto() {
        setPreview(null);
    }

    {/* Libère la mémoire de l'aperçu */}

    useEffect(() => {
        return () => { if (preview) URL.revokeObjectURL(preview); };
    }, [preview]);

    {/* Gestion Formulaire UseForm */}

    const { register,  handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema)
    })

    function onclickRating(n: number) {
        if (!n) return
        setRating(n)
        setValue('rating', n)
    }

    {/* Store Review */}

    const { reviewAdd, resetSuccessMessage, resetErrorMessage, successMessage, errorMessage } = useReviewStore()

    {/* Gestion Validation Form */}

    async function onSubmit(data: ReviewFormData, e: PointerEvent) {
        e.preventDefault()
        try {
            await reviewAdd(data)
            handleResetSuccess()
        } catch (err: any) {
            handleResetError()
        }
    }

    function handleResetSuccess() {
        setTimeout(() => {
            resetSuccessMessage()
            setOpen(false)
            reset()
        }, DELAY_TIMEOUT)
    }

    function handleResetError() {
        setTimeout(() => {
            resetErrorMessage()
        }, DELAY_TIMEOUT)
    }

    return (
        <>
            <div className={styles['add']}>
                <button type="button" className={styles['add__button']} onClick={() => setOpen(true)}>
                    ✎ Laisser un avis
                </button>
            </div>

            {open && (
                <div className={styles['modal']} onClick={() => setOpen(false)}>
                    <div
                        className={styles['modal__dialog']}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="review-modal-title"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button type="button" className={styles['modal__close']} onClick={() => setOpen(false)} aria-label="Fermer">×</button>

                        <span className={styles['modal__eyebrow']}>Votre avis compte</span>
                        <h3 id="review-modal-title" className={styles['modal__title']}>Laisser un avis</h3>

                        <form className={styles['modal__form']} onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles['modal__field']}>
                                <label className={styles['modal__label']}>Votre note</label>
                                <div className={styles['modal__stars']}>
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <button
                                            key={n}
                                            type="button"
                                            className={`${styles['modal__star']} ${n <= rating ? styles['modal__star--on'] : ''}`}
                                            onClick={() => onclickRating(n)}
                                            aria-label={`${n} sur 5`}
                                        >★</button>
                                    ))}
                                </div>
                                {errors && <small>{errors.rating?.message}</small>}
                            </div>

                            <div className={styles['modal__field']}>
                                <label className={styles['modal__label']} htmlFor="review-name">Votre nom</label>
                                <input
                                    {...register('name')}
                                    id="review-name"
                                    type="text"
                                    className={styles['modal__input']}
                                    placeholder="Ex : Sophie L."
                                />
                                {errors && <small>{errors.name?.message}</small>}
                            </div>

                            <label className={styles['modal__label']}>Photo (facultatif)</label>

                            {preview ? (
                                <div className={styles['modal__preview']}>
                                    <Image src={preview} alt="Aperçu" className={styles['modal__previewImg']} width={100} height={100} />
                                    <button type="button" className={styles['modal__remove']} onClick={removePhoto}>
                                        Retirer
                                    </button>
                                </div>
                            ) : (
                                <label className={styles['modal__file']} htmlFor="review-photo">
                                    <span className={styles['modal__fileIcon']}>📷</span>
                                    <span>Ajouter une photo</span>
                                    <input
                                        id="review-photo"
                                        type="file"
                                        accept="image/*"
                                        className={styles['modal__fileInput']}
                                        onChange={onPhotoChange}
                                    />
                                </label>
                            )}

                            {errors && <small>{errors.picture?.message}</small>}
                            {photoError && <small className={styles['modal__error']}>{photoError}</small>}

                            <div className={styles['modal__field']}>
                                <label className={styles['modal__label']} htmlFor="review-pizza">Pizza commandée</label>
                                <select {...register('pizza')} id="review-pizza" className={styles['modal__input']} defaultValue={""}>
                                    {PIZZAS.map((p) => <option key={p} value={p}>{p}</option>)}
                                </select>
                                {errors && <small>{errors.pizza?.message}</small>}
                            </div>

                            <div className={styles['modal__field']}>
                                <label className={styles['modal__label']} htmlFor="review-text">Votre avis</label>
                                <textarea {...register('message')} id="review-text" className={styles['modal__textarea']} rows={4} placeholder="Racontez-nous votre expérience…" />
                                {errors && <small>{errors.message?.message}</small>}
                            </div>

                            <small className={styles['modal__success--message']}>{successMessage}</small>
                            <small className={styles['modal__error--message']}>{errorMessage}</small>

                            <div className={styles['modal__actions']}>
                                <button type="button" className={styles['modal__cancel']} onClick={() => setOpen(false)}>Annuler</button>
                                <button type="submit" className={styles['modal__submit']} disabled={isSubmitting}>
                                    {isSubmitting ? 'Chargement…' : 'Publier'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}