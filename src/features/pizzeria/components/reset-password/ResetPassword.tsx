"use client"

import styles from './ResetPassword.module.scss.module.scss'

import {useAuthStore} from "@/store/auth.store";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod"

const DELAY_TIMEOUT = 2000

const schema = z.object({
    password: z.string().trim().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }).max(30, { message: 'Le mot de passe doit contenir au maximum 30 caractères' }),
    passwordConfirm: z.string().trim().min(1, { message: 'Merci de confirmer ton mot de passe' }),
}).refine((value) => value.password === value.passwordConfirm, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['passwordConfirm']
})

export default function ResetPassword() {

    const { register, handleSubmit, reset, formState: {errors, isSubmitting} } = useForm({
        resolver: zodResolver(schema)
    })

    const { resetSuccessMessage, resetErrorMessage, successMessage, errorMessage } = useAuthStore()

    async function onSubmit(data: any) {
        try {
            console.log(data)
        } catch (err: any) {
            console.error(err)
            throw err
        }
    }

    return (
        <main className={styles['reset']}>
            <section className={styles['reset__main']}>
                <div className={styles['reset__card']}>
                    <h2>Nouveau mot de passe</h2>
                    <p className={styles['reset__sub']}>Choisis ton nouveau mot de passe.</p>
                    <form onSubmit={handleSubmit(onSubmit)} action="/login" method="post" noValidate className={styles['reset__form']}>
                        <div className={styles['reset__field']}>
                            <input {...register('password')} id="password" name="password" type="email" placeholder="vous@exemple.fr" />
                            {errors && <small className={styles['error-field']}>{errors.password?.message}</small>}
                        </div>
                        <div className={styles['reset__field']}>
                            <input {...register('passwordConfirm')} id="passwordConfirm" name="passwordConfirm" type="email" placeholder="vous@exemple.fr" />
                            {errors && <small className={styles['error-field']}>{errors.passwordConfirm?.message}</small>}
                        </div>
                        {successMessage && <small className={styles['request__success']}>{successMessage}</small>}
                        {errorMessage && <small className={styles['request__error']}>{errorMessage}</small>}
                        <button type="submit" className={`${styles['btn']} ${styles['btn--primary']}`} disabled={isSubmitting}>
                            {isSubmitting ? 'Chargement…' : 'Envoyer le lien'}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    )
}