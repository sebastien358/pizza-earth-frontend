'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from 'lucide-react';
import styles from './Contact.module.scss';

const INFOS = [
    { icon: MapPin, title: 'Adresse', value: '12 Rue des Lilas, 27250 Rugles' },
    { icon: Phone, title: 'Téléphone', value: '02 32 24 00 00' },
    { icon: Mail, title: 'E-mail', value: 'hello@pizzaearth.com' },
];

// À adapter avec tes vrais horaires
const HOURS = [
    { days: 'Mardi – jeudi', time: '18h – 22h' },
    { days: 'Vendredi – samedi', time: '18h – 23h' },
    { days: 'Dimanche', time: '18h – 22h' },
];

const SUBJECTS = ['Question sur une commande', 'Réclamation', 'Partenariat', 'Autre'];

export default function Contact() {
    const [sent, setSent] = useState(false);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: appel API
        setSent(true);
    };

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
                            <p className={styles['form__success']}>
                                Message envoyé. Nous vous répondons dans les plus brefs délais.
                            </p>
                        ) : (
                            <form className={styles['form__body']} onSubmit={onSubmit}>
                                <div className={styles['form__row']}>
                                    <div className={styles['form__field']}>
                                        <label className={styles['form__label']} htmlFor="contact-name">Nom</label>
                                        <input id="contact-name" type="text" className={styles['form__input']} placeholder="Sophie L." maxLength={50} required />
                                    </div>
                                    <div className={styles['form__field']}>
                                        <label className={styles['form__label']} htmlFor="contact-email">E-mail</label>
                                        <input id="contact-email" type="email" className={styles['form__input']} placeholder="sophie@email.com" required />
                                    </div>
                                </div>

                                <div className={styles['form__field']}>
                                    <label className={styles['form__label']} htmlFor="contact-subject">Sujet</label>
                                    <select id="contact-subject" className={styles['form__input']} required defaultValue="">
                                        <option value="" disabled>Choisissez un sujet</option>
                                        {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                                    </select>
                                </div>

                                <div className={styles['form__field']}>
                                    <label className={styles['form__label']} htmlFor="contact-message">Message</label>
                                    <textarea id="contact-message" className={styles['form__textarea']} rows={5} minLength={10} maxLength={500} placeholder="Votre message…" required />
                                </div>

                                <button type="submit" className={styles['form__submit']}>
                                    <Send size={18} /> Envoyer le message
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