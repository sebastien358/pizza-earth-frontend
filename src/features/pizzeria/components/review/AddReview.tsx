'use client';
import {ChangeEvent, useEffect, useState} from 'react';
import styles from './AddReview.module.scss';
import Image from "next/image";
import {create} from "zustand/react";

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

    // dans le composant
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [photoError, setPhotoError] = useState('');

    function onPhotoChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) return setPhotoError('Le fichier doit être une image.');
        if (file.size > 2 * 1024 * 1024) return setPhotoError('Image trop lourde (2 Mo max).');

        setPhotoError('');
        setPhoto(file);
        setPreview(URL.createObjectURL(file))
    }

    function removePhoto() {
        setPhoto(null);
        setPreview(null);
    }

// libère la mémoire de l'aperçu
    useEffect(() => {
        return () => { if (preview) URL.revokeObjectURL(preview); };
    }, [preview]);

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

                        <form className={styles['modal__form']} onSubmit={(e) => { e.preventDefault(); setOpen(false); }}>
                            <div className={styles['modal__field']}>
                                <label className={styles['modal__label']}>Votre note</label>
                                <div className={styles['modal__stars']}>
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <button
                                            key={n}
                                            type="button"
                                            className={`${styles['modal__star']} ${n <= rating ? styles['modal__star--on'] : ''}`}
                                            onClick={() => setRating(n)}
                                            aria-label={`${n} sur 5`}
                                        >★</button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles['modal__field']}>
                                <label className={styles['modal__label']} htmlFor="review-name">Votre nom</label>
                                <input
                                    id="review-name"
                                    type="text"
                                    className={styles['modal__input']}
                                    placeholder="Ex : Sophie L."
                                    maxLength={30}
                                    required
                                />
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

                            {photoError && <span className={styles['modal__error']}>{photoError}</span>}

                            <div className={styles['modal__field']}>
                                <label className={styles['modal__label']} htmlFor="review-pizza">Pizza commandée</label>
                                <select id="review-pizza" className={styles['modal__input']} required>
                                    {PIZZAS.map((p) => <option key={p}>{p}</option>)}
                                </select>
                            </div>

                            <div className={styles['modal__field']}>
                                <label className={styles['modal__label']} htmlFor="review-text">Votre avis</label>
                                <textarea id="review-text" className={styles['modal__textarea']} rows={4} maxLength={300} required placeholder="Racontez-nous votre expérience…" />
                            </div>

                            <div className={styles['modal__actions']}>
                                <button type="button" className={styles['modal__cancel']} onClick={() => setOpen(false)}>Annuler</button>
                                <button type="submit" className={styles['modal__submit']}>Publier</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}