'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from 'lucide-react';
import styles from './Contact.module.scss';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod"
import {ContactFormData, useContactSTore} from "@/store/contact.store";

const DELAY_TIMEOUT = 2000

const INFOS = [
    { icon: MapPin, title: 'Adresse', value: '12 Rue des Lilas, 27250 Rugles' },
    { icon: Phone, title: 'Téléphone', value: '02 32 24 00 00' },
    { icon: Mail, title: 'E-mail', value: 'hello@pizzaearth.com' },
];

// À adapter avec tes vrais horaires
const HOURS = [
    { days: 'Lundi – jeudi', time: '11h30h – 22h00' },
    { days: 'Vendredi – samedi', time: '11h30h – 23h00' },
    { days: 'Dimanche', time: '12h00 – 21h30' },
];

const SUBJECTS = ['Question sur une commande', 'Réclamation', 'Partenariat', 'Autre'];

const schema = z.object({
    name: z.string().trim().min(3, "3 caractères minimum").max(50, { message: "50 caractères max" }),
    email: z.email({ message: "Email invalide" }),
    subject: z.string().min(1, { message: "Choisis un sujet" }),
    message: z.string().trim().min(30, { message: "30 caractères minimum" }).max(300, { message: "300 caractères max" }),
})

export default function Contact() {

    {/* Gestion Form */}

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema)
    })

    {/* Store Contact */}

    const { contactAdd, resetSuccessMessage, resetErrorMessage, successMessage, errorMessage } = useContactSTore()

    {/* Gestion Message De Confirmation */}

    const [sent, setSent] = useState<boolean>(false);

    {/* Gestion Soumission Du Formulaire */}

    async function onSubmit(data: ContactFormData) {
        try {
            await contactAdd(data)
            handleSuccess()
        } catch (err: any) {
            handleError()
        }
    }

    function handleSuccess() {
        setSent(true);
        setTimeout(() => {
            resetSuccessMessage()
            setSent(false);
            reset()
        }, DELAY_TIMEOUT)
    }

    function handleError() {
        setTimeout(() => {
            resetErrorMessage()
        }, DELAY_TIMEOUT)
    }

    return (
        <main className={styles['contact']}>
            {/* HERO */}
            <section className={styles['hero']}>
                <div className={styles['hero__inner']}>
                    <span className={styles['hero__eyebrow']}>Contact</span>
                    <h1 className={styles['hero__title']}>
                        Une question ? <span className={styles['hero__accent']}>Parlons-en</span>
                    </h1>
                    <p className={styles['hero__text']}>
                        Commande, partenariat ou simple message : on vous répond rapidement.
                    </p>
                </div>
            </section>

            {/* INFOS + FORMULAIRE */}
            <section className={styles['main']}>
                <div className={styles['main__inner']}>
                    <aside className={styles['info']}>
                        <ul className={styles['info__list']}>
                            {INFOS.map(({ icon: Icon, title, value }) => (
                                <li key={title} className={styles['info__card']}>
                                    <span className={styles['info__icon']}><Icon size={22} /></span>
                                    <div className={styles['info__body']}>
                                        <strong className={styles['info__title']}>{title}</strong>
                                        <span className={styles['info__value']}>{value}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className={styles['hours']}>
                            <h2 className={styles['hours__title']}><Clock size={18} /> Horaires</h2>
                            <ul className={styles['hours__list']}>
                                {HOURS.map((h) => (
                                    <li key={h.days} className={styles['hours__row']}>
                                        <span>{h.days}</span>
                                        <span>{h.time}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    <div className={styles['form']}>
                        <span className={styles['form__eyebrow']}>Écrivez-nous</span>
                        <h2 className={styles['form__title']}>Envoyer un message</h2>

                        {sent ? (
                            <>
                                <p className={styles['form__success']}>{successMessage}</p>
                                <p className={styles['form__error']}>{errorMessage}</p>
                            </>
                        ) : (
                            <form className={styles['form__body']} onSubmit={handleSubmit(onSubmit)}>
                                <div className={styles['form__row']}>
                                    <div className={styles['form__field']}>
                                        <label className={styles['form__label']} htmlFor="contact-name">Nom</label>
                                        <input {...register('name')} id="contact-name" type="text" className={styles['form__input']} placeholder="Sophie L." />
                                        {errors && <small className={styles['error-field']}>{errors?.name?.message}</small>}
                                    </div>
                                    <div className={styles['form__field']}>
                                        <label className={styles['form__label']} htmlFor="contact-email">E-mail</label>
                                        <input {...register('email')}  id="contact-email" type="email" className={styles['form__input']} placeholder="sophie@email.com" />
                                        {errors && <small className={styles['error-field']}>{errors?.email?.message}</small>}
                                    </div>
                                </div>
                                <div className={styles['form__field']}>
                                    <label className={styles['form__label']} htmlFor="contact-subject">Sujet</label>
                                    <select {...register('subject')} id="contact-subject" className={styles['form__input']} defaultValue="">
                                        <option value="" disabled>Choisissez un sujet</option>
                                        {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                                    </select>
                                    {errors && <small className={styles['error-field']}>{errors?.subject?.message}</small>}
                                </div>
                                <div className={styles['form__field']}>
                                    <label className={styles['form__label']} htmlFor="contact-message">Message</label>
                                    <textarea {...register('message')} id="contact-message" className={styles['form__textarea']} rows={5} minLength={10} placeholder="Votre message…" />
                                    {errors && <small className={styles['error-field']}>{errors?.message?.message}</small>}
                                </div>
                                <button type="submit" className={styles['form__submit']} disabled={isSubmitting}>
                                    <Send size={18} /> {isSubmitting ? 'Chargement…' :  'Envoyer le message' }
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA EMPLACEMENT */}
            <section className={styles['visit']}>
                <div className={styles['visit__card']}>
                    <div className={styles['visit__text']}>
                        <h2 className={styles['visit__title']}>Envie de passer nous voir ?</h2>
                        <p className={styles['visit__sub']}>Retrouvez l'itinéraire et le plan d'accès.</p>
                    </div>
                    <Link href="/emplacement" className={styles['visit__btn']}>
                        Voir l'emplacement <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </main>
    );
}