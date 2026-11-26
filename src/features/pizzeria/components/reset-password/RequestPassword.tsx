"use client"

import styles from './RequestPassword.module.scss'

import {RequestFormData, useAuthStore} from "@/store/auth.store";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod"

const DELAY_TIMEOUT = 2000

const schema = z.object({
    email: z.email({ message: "Veuillez renseigner un email" })
})

export default function RequestPassword() {

    const { register, handleSubmit, reset, formState: {errors, isSubmitting} } = useForm({
        resolver: zodResolver(schema)
    })

    const { requestPassword, resetSuccessMessage, resetErrorMessage, successMessage, errorMessage } = useAuthStore()

    async function onSubmit(data: RequestFormData) {
        try {
            await requestPassword(data)
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
        <main className={styles['request']}>
            <section className={styles['request__main']}>
                <div className={styles['request__card']}>
                    <h2>Mot de passe oublié ?</h2>
                    <p className={styles['request__sub']}>Entre ton email, on t'envoie un lien pour le réinitialiser.</p>
                    <form onSubmit={handleSubmit(onSubmit)} action="/login" method="post" noValidate className={styles['request__form']}>
                        <div className={styles['request__field']}>
                            <input {...register('email')} id="email" name="email" type="email" autoComplete="email" placeholder="vous@exemple.fr" />
                            {errors && <small className={styles['error-field']}>{errors.email?.message}</small>}
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