"use client"

import styles from './Register.module.scss'

import Link from "next/link";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from 'zod';
import {RegisterFormData, useAuthStore} from "@/store/auth.store";
import {useRouter} from "next/navigation";
const DELAY_TIMEOUT = 2000

const schema = z.object({
    firstname: z.string().trim().min(1, { message: 'Le prénom est requis' }).max(50, { message: '50 caractères max' }),
    lastname: z.string().trim().min(1, { message: 'Le nom est requis' }).max(50, { message: '50 caractères max' }),
    email: z.string().trim().email({ message: 'Email invalide' }),
    phone: z.string().trim().regex(/^(?:(?:\+33|0)[1-9])(?:[ .-]?\d{2}){4}$/, { message: 'Numéro de téléphone invalide' }),
    password: z.string().min(8, { message: '8 caractères minimum' }).max(100, { message: '100 caractères max' }),
    confirm: z.string().min(8, { message: '8 caractères minimum' }).max(100, { message: '100 caractères max' }),
    terms: z.boolean({ message: 'Vous devez accepter les conditions' }).refine((value) => value === true, {
        message: 'Vous devez accepter les conditions',
    }),
}).refine((data) => data.password === data.confirm, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirm'],
});

export default function Register() {

    const { registration, resetSuccessMessage, resetErrorMessage, successMessage, errorMessage } = useAuthStore()

    const { register, reset, handleSubmit, formState: {errors, isSubmitting} } = useForm({
        resolver: zodResolver(schema)
    })

    async function onSubmit(data: RegisterFormData) {
        try {
            await registration(data)
            handleSuccess()
        } catch (err: any) {
            handleError()
        }
    }

    const router = useRouter()

    function handleSuccess() {
        setTimeout(() => {
            resetSuccessMessage()
            router.push('/login')
            reset()
        }, DELAY_TIMEOUT)
    }

    function handleError() {
        setTimeout(() => {
            resetErrorMessage()
        }, DELAY_TIMEOUT)
    }

    return (
        <main className={styles['register']}>
            {/* ASIDE */}
            <aside className={styles['register__side']}>
                <a href="/public" className={styles['logo']}>PIZZA <span>EARTH</span></a>
                <div className={styles['register__pitch']}>
                    <h1>Rejoignez <span>la Terre</span> des gourmands !</h1>
                    <ul>
                        <li>Commandez en 2 clics</li>
                        <li>Suivez votre pizza en direct</li>
                        <li>Offres réservées aux membres</li>
                    </ul>
                </div>
                <p className={styles['register__note']}>Emballage écologique, ingrédients frais.</p>
            </aside>
            {/* ASIDE */}
            <section className={styles['register__main']}>
                <div className={styles['card']}>
                    <h2>Créer un compte</h2>
                    <p className={styles['card__sub']}>Ça prend moins d’une minute.</p>
                    {/* FORM */}
                    <form onSubmit={handleSubmit(onSubmit)} action="/register" method="post" noValidate className={styles['register__form']}>
                        <div className={styles['row']}>
                            <div className={styles['field']}>
                                <label htmlFor="firstname">Prénom</label>
                                <input {...register('firstname')} id="firstname" name="firstname" type="text" autoComplete="given-name" required />
                                {errors && <small>{errors.firstname?.message}</small>}
                            </div>
                            <div className={styles['field']}>
                                <label htmlFor="lastname">Nom</label>
                                <input {...register('lastname')} id="lastname" name="lastname" type="text" autoComplete="family-name" required />
                                {errors && <small>{errors.lastname?.message}</small>}
                            </div>
                        </div>
                        <div className={styles['field']}>
                            <label htmlFor="email">Email</label>
                            <input {...register('email')} id="email" name="email" type="email" autoComplete="email" placeholder="vous@exemple.fr" required />
                            {errors && <small>{errors.email?.message}</small>}
                        </div>
                        <div className={styles['field']}>
                            <label htmlFor="phone">Téléphone <small>(facultatif)</small></label>
                            <input {...register('phone')} id="phone" name="phone" type="tel" autoComplete="tel"/>
                            {errors && <small>{errors.phone?.message}</small>}
                        </div>
                        <div className={styles['field']}>
                            <label htmlFor="password">Mot de passe</label>
                            <input {...register('password')} id="password" name="password" type="password" autoComplete="password" minLength="8" aria-describedby="pwd-help" required />
                            {errors ? <small>{errors.password?.message}</small> : <small>8 caractères minimum.</small>}
                        </div>
                        <div className={styles['field']}>
                            <label htmlFor="confirm">Confirmer le mot de passe</label>
                            <input {...register('confirm')} id="confirm" name="confirm" type="password" autoComplete="confirm" required/>
                            {errors && <small>{errors.confirm?.message}</small>}
                        </div>
                        <label className={styles['check']}>
                            <input {...register('terms')} type="checkbox" name="terms" required/>
                            <span>J’accepte les <a href="/conditions">conditions d’utilisation</a> et la <a href="/confidentialite">politique de confidentialité</a>.</span>
                            {errors && <small>{errors.terms?.message}</small>}
                        </label>

                        {successMessage && <p className={styles['success-message']}>{successMessage}</p>}
                        {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}

                        <button type="submit" className={`${styles['btn']} ${styles['btn--primary']}`} disabled={isSubmitting}>
                            {isSubmitting ? 'Chargement…' : 'Créer mon compte'}
                        </button>
                    </form>
                    <p className={styles['card__alt']}>Déjà un compte ? <Link href="/login">Se connecter</Link></p>
                </div>
            </section>
        </main>
    )
}