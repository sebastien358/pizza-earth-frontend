"use client"

import styles from './Order.module.scss'

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {z} from "zod"
import {useCartStore} from "@/store/cart.store";

const schema = z.object({
    name: z.string().trim().min(3, { message: 'Nom trop court' }).max(50, { message: 'Nom trop long' }),
    email: z.email({ message: 'Veuillez renseigner un email' }),
    phone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, { message: 'Numéro de téléphone invalide' }),
    deliveryMode: z.enum(['delivery', 'pickup']),
    address: z.string().optional(),
    complementAddress: z.string().optional(),
    postalCode: z.string().optional(),
    city: z.string().optional(),
    deliveryInstructions: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.deliveryMode === 'delivery') {
        if (!data.address || data.address.trim().length < 10) {
            ctx.addIssue({ code: 'custom', path: ['address'], message: 'Adresse trop courte' })
        }
        if (!data.postalCode || !/^\d{5}$/.test(data.postalCode)) {
            ctx.addIssue({ code: 'custom', path: ['postalCode'], message: 'Code postal invalide' })
        }
        if (!data.city || data.city.trim().length < 2) {
            ctx.addIssue({ code: 'custom', path: ['city'], message: 'Ville trop courte' })
        }
    }
})

interface OrderProps {
    onSubmit: (data: any) => Promise<void>
}

export default function Order({ onSubmit }: OrderProps) {

    const { register, handleSubmit, setValue, watch, reset, formState: { isSubmitting, errors } }  = useForm({
        resolver: zodResolver(schema),
        defaultValues: { deliveryMode: 'delivery' }
    })


    const { setDelivery } = useCartStore()

    const deliveryMode = watch('deliveryMode')

    // + useEffect qui met le prix

    useEffect(() => {
        setDelivery(deliveryMode === 'delivery' ? 3.90 : 0)
    }, [deliveryMode])

    function addDelivered() {
        setValue('deliveryMode', 'delivery')
        setDelivery(2.90)
    }

    function noDelivered() {
        setValue('deliveryMode', 'pickup')
        setDelivery(0)
    }

    return (
        <main className={styles['order']}>
            {/* TES INFOS */}
            <div className={styles['order__card']}>
                <div className={styles['order__cardHead']}>
                    <span className={styles['order__icon']}>👤</span>
                    <div><h2>Tes infos</h2><p>Pour te joindre si besoin.</p></div>
                </div>

                <form id="order-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles['order__field']}>
                        <label className={styles['order__label']}>Nom complet</label>
                        <input {...register('name')} className={styles['order__input']} placeholder="Ex : Léa Martin" />
                        {errors && <span className={styles['error-field']}>{ errors?.name?.message }</span>}
                    </div>

                    <div className={styles['order__row']}>
                        <div className={styles['order__field']}>
                            <label className={styles['order__label']}>✉️ Email</label>
                            <input {...register('email')} className={styles['order__input']} placeholder="lea@exemple.fr" />
                            {errors && <span className={styles['error-field']}>{ errors?.email?.message }</span>}
                        </div>
                        <div className={styles['order__field']}>
                            <label className={styles['order__label']}>📞 Téléphone</label>
                            <input {...register('phone')} className={styles['order__input']} placeholder="06 12 34 56 78" />
                            {errors && <span className={styles['error-field']}>{ errors?.phone?.message }</span>}
                        </div>
                    </div>

                    {/* LIVRAISON */}
                    <div className={styles['']}>
                        <div className={styles['order__cardHead']}>
                            <span className={styles['order__icon']}>🚴</span>
                            <div><h2>Livraison</h2><p>Choisis comment recevoir ta commande.</p></div>
                        </div>

                        <div className={styles['order__choiceRow']}>
                            <button
                                type={"button"}
                                onClick={() => addDelivered()}
                                className={ deliveryMode === 'delivery' ? styles['order__choice--active'] : styles['order__choice']}
                            >
                                <span>🚴</span><b>Livraison</b><span>+2,90€ • environ 30 min</span>
                            </button>
                            <button
                                type={"button"}
                                onClick={() => noDelivered()}
                                className={ deliveryMode === 'delivery' ? styles['order__choice'] : styles['order__choice--active']}
                            >
                                <span>🏪</span><b>Retrait</b><span>Gratuit • prêt en 15 min</span>
                            </button>

                            {errors && <span className={styles['error-field']}>{ errors?.deliveryMode?.message }</span>}
                        </div>

                        <label className={styles['order__label']}>📍 Adresse de livraison</label>

                        <div className={styles['order__field']}>
                            <input {...register('address')} className={styles['order__input']} placeholder="12 rue des Oliviers, 75011 Paris" />
                            {errors && <span className={styles['error-field']}>{ errors?.address?.message }</span>}
                        </div>

                        <div className={styles['order__field']}>
                            <input {...register('complementAddress')} className={styles['order__input']} placeholder="Complément (bâtiment, étage, code...)" />
                            {errors && <span className={styles['error-field']}>{ errors?.complementAddress?.message }</span>}
                        </div>

                        <div className={styles['order__row']}>
                            <div className={styles['order__field']}>
                                <input {...register('postalCode')} className={styles['order__input']} placeholder="Code postal *" />
                                {errors && <span className={styles['error-field']}>{ errors?.postalCode?.message }</span>}
                            </div>
                            <div className={styles['order__field']}>
                                <input {...register('city')} className={styles['order__input']} placeholder="Ville *" />
                                {errors && <span className={styles['error-field']}>{errors?.city?.message}</span>}
                            </div>
                        </div>

                        <textarea {...register('deliveryInstructions')} className={styles['order__textarea']} placeholder="Instructions pour le livreur (interphone, code...)" />
                    </div>
                </form>
            </div>
        </main>
    )
}