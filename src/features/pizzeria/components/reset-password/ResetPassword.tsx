"use client"

import styles from './ResetPassword.module.scss'

import {ResetFormData, useAuthStore} from "@/store/auth.store";
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

export default function ResetPassword({ token }: { token: string }) {

    const { register, handleSubmit, reset, formState: {errors, isSubmitting} } = useForm({
        resolver: zodResolver(schema)
    })

    const { resetPassword, resetSuccessMessage, resetErrorMessage, successMessage, errorMessage } = useAuthStore()

    async function onSubmit(data: ResetFormData) {
        try {
            await resetPassword(data, token)
            handleSuccess()
        } catch (err: any) {
            handleError()
        }
    }

    function handleSuccess() {
        setTimeout(() => {
            resetSuccessMessage()
        }, DELAY_TIMEOUT)
    }

    function handleError() {
        setTimeout(() => {
            resetErrorMessage()
        }, DELAY_TIMEOUT)
    }

    return (
        <main className={styles['reset']}>
            <div className={styles['reset__main']}>
                <h2>Nouveau mot de passe</h2>
                <p className={styles['reset__sub']}>Choisis ton nouveau mot de passe.</p>
                <form onSubmit={handleSubmit(onSubmit)} action="/login" method="post" noValidate className={styles['reset__form']}>
                    <div className={styles['reset__field']}>
                        <input {...register('password')} id="password" type="password" placeholder="Nouveau mot de passe" />
                        {errors && <small className={styles['error-field']}>{errors.password?.message}</small>}
                    </div>
                    <div className={styles['reset__field']}>

                        <input {...register('passwordConfirm')} id="passwordConfirm" type="password" placeholder="Confirme ton mot de passe" />
                        {errors && <small className={styles['error-field']}>{errors.passwordConfirm?.message}</small>}
                    </div>
                    {successMessage && <small className={styles['reset__success']}>{successMessage}</small>}
                    {errorMessage && <small className={styles['reset__error']}>{errorMessage}</small>}
                    <button type="submit" className={`${styles['btn']} ${styles['btn--primary']}`} disabled={isSubmitting}>
                        {isSubmitting ? 'Chargement…' : 'Réinitialiser le mot de passe'}
                    </button>
                </form>
            </div>
        </main>
    )
}