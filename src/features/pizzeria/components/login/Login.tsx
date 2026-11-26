"use client"

import styles from './Login.module.scss'

import Link from "next/link";
import {useForm} from "react-hook-form";
import {LoginFormData, useAuthStore} from "@/store/auth.store";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {z} from "zod"
import {useCartStore} from "@/store/cart.store";

const DELAY_TIMEOUT = 2000

const schema = z.object({
    email: z.string().trim().email({ message: 'Email invalide' }),
    password: z.string().min(8, { message: '8 caractères minimum' }).max(100, { message: '100 caractères max' }),
    remember: z.boolean().optional().default(false)
});

export default function Login() {

    {/* Store Auth */}

    const { isAdmin, isUser, userExisted, login, successMessage, errorMessage, resetSuccessMessage, resetErrorMessage } = useAuthStore()

    {/* Store Cart */}

    const { cart } = useCartStore()

    {/* Gestion formulaire  */}

    const router = useRouter()

    const { register, handleSubmit, reset, formState: {errors, isSubmitting} } = useForm({
        resolver: zodResolver(schema)
    })

    async function onSubmit(data: LoginFormData) {
        try {
            await userExisted(data)
            await login(data)
            handleSuccess()
        } catch (err: any) {
           handleError()
        }
    }

    function handleSuccess() {
        setTimeout(() => {
            resetSuccessMessage()
            reset()
            if (isAdmin()) {
                router.push('/admin/commands')
                return
            } else if (isUser() && cart.length > 0) {
                router.push('/cart')
                return
            } else if (isUser() && !cart.length) {
                router.push('/pizzas')
                return
            } else {
                router.push('/')
            }
        }, DELAY_TIMEOUT)
    }

    function handleError() {
        setTimeout(() => {
            resetErrorMessage()
        }, DELAY_TIMEOUT)
    }

    return (
        <main className={styles['auth']}>
            <aside className={styles['auth__side']}>
                <Link href="/" className={styles['logo']}>PIZZA <span>EARTH</span></Link>
                <div className={styles['auth__pitch']}>
                    <h1>Content de vous <span>revoir</span> !</h1>
                    <ul>
                        <li>Retrouvez vos pizzas préférées</li>
                        <li>Suivez vos commandes en direct</li>
                        <li>Profitez de vos offres membres</li>
                    </ul>
                </div>
                <p className={styles['auth__note']}>Emballage écologique, ingrédients frais.</p>
            </aside>
            <section className={styles['auth__main']}>
                <div className={styles['card']}>
                    <h2>Connexion</h2>
                    <p className={styles['card__sub']}>Heureux de vous retrouver.</p>
                    <form onSubmit={handleSubmit(onSubmit)} action="/login" method="post" noValidate className={styles['auth__form']}>
                        <div className={styles['field']}>
                            <label htmlFor="email">Email</label>
                            <input {...register('email')} id="email" name="email" type="email" autoComplete="email" placeholder="vous@exemple.fr" />
                            {errors && <small className={styles['error-field']}>{errors.email?.message}</small>}
                        </div>
                        <div className={styles['field']}>
                            <label htmlFor="password">Mot de passe</label>
                            <input {...register('password')} id="password" name="password" type="password" autoComplete="current-password" />
                            {errors && <small className={styles['error-field']}>{errors.password?.message}</small>}
                        </div>
                        <div className={styles['options']}>
                            <label className={styles['check']}>
                                <input {...register('remember')} type="checkbox" name="terms" />
                                <span>Se souvenir de moi</span>
                            </label>
                            <a href="/mot-de-passe-oublie">Mot de passe oublié ?</a>
                        </div>

                        {successMessage && <p className={styles['success-message']}>{successMessage}</p>}
                        {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}

                        <button type="submit" className={`${styles['btn']} ${styles['btn--primary']}`} disabled={isSubmitting}>
                            {isSubmitting ? 'Chargement…' : 'Se connecter'}
                        </button>
                    </form>
                    <p className={styles['card__alt']}>Pas encore de compte ? <Link href="/register">Créer un compte</Link></p>
                </div>
            </section>
        </main>
    )
}