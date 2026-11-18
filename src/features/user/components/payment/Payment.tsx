"use client";

import styles from "./Payment.module.scss";

import Link from "next/link";

import Image from "next/image";
import Order from "@/features/user/components/orders/Order";
import { OrderFormData, useOrderStore } from "@/store/user/order.store";
import { loadStripe } from '@stripe/stripe-js';
import { CardNumberElement, CardExpiryElement, CardCvcElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useCartStore} from "@/store/cart.store";

const DELAY_TIMEOUT = 2000;
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

async function paymentStripe(payment: any) {
    return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/payment`, payment);
}

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [method, setMethod] = useState<'card' | '【entity-paypal¦canonical_name=PayPal】' | 'apple'>('card');

    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);

    const { cart, totalCart, totalDelivered, deliveryPrice, resetCart } = useCartStore();
    const { orderNew, successMessage, errorMessage, resetSuccessMessage, resetErrorMessage } = useOrderStore();

    async function onSubmit(data: OrderFormData) {
        let paymentIntentId: string | null = null; // ✅
        setPaymentError(null); // ✅ reset
        setPaymentSuccess(null); // ✅ reset

        // 1. Paiement

        if (method === 'card') {
            if (!stripe || !elements) return;
            const card = elements.getElement(CardNumberElement);

            if (!card) return;

            const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card });
            if (error) {
                setPaymentError(error.message ?? "Paiement refusé par votre banque");
                return;
            }

            try {
                const paymentRes = await paymentStripe({
                    id: paymentMethod.id,
                    total: totalDelivered(),
                    amount: Math.round(totalDelivered() * 100),
                    currency: 'eur'
                });

                // 👇 3D SECURE : c'est le seul truc qui te manquait
                if (paymentRes.data.type === 'REQUIRES_ACTION') {
                    setPaymentSuccess("Vérification 3D Secure en cours...");
                    const { error: confirmError } = await stripe.confirmCardPayment(
                        paymentRes.data.client_secret
                    );
                    if (confirmError) {
                        setPaymentError("Validation 3D Secure refusée");
                        return;
                    }
                }

                paymentIntentId = paymentRes.data.payment_intent_id ?? null
                setPaymentSuccess("✓ Paiement validé"); // <-- le message
            } catch (err: any) {
                // ✅ Erreur 2, 3, 4 : toutes les autres erreurs Stripe passent ici
                // - Fonds insuffisants
                // - 3D Secure raté
                // - Serveur down
                setPaymentError(err.response?.data?.error || "Paiement refusé par votre banque");
                return;
            }
        }

        // 2. Délai après le paiement
        await new Promise(r => setTimeout(r, 1000));

        // 3. Commande
        try {
            await orderNew({...data, payment_intent_id: paymentIntentId});
            handleSuccess();
        } catch {
            // 1. Remboursement d'abord
            if (paymentIntentId) {
                try {
                    await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/user/payment/refund`,
                        { payment_intent_id: paymentIntentId },
                        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                    );
                } catch {}
            }

            // 2. Erreur après
            handleError();
        }
    }

    const router = useRouter()

    function handleSuccess() {
        setTimeout(() => {
            resetSuccessMessage();
            router.push('/')
            resetCart();
        }, DELAY_TIMEOUT);
    }

    function handleError() {
        setTimeout(() => {
            resetErrorMessage();
        }, DELAY_TIMEOUT);
    }

    return (
        <main className={styles['checkout']}>
            <div className={styles['container']}>
                <span className={styles['checkout__badge']}>🔒 PAIEMENT SÉCURISÉ</span>
                <h1 className={styles['checkout__title']}>Valider ma commande</h1>
                <p className={styles['checkout__subtitle']}>Encore une étape, et tes pizzas sont en route. Vérifie tes infos, choisis ton mode de retrait et paie en toute sécurité.</p>

                <div className={styles['checkout__steps']}>
                    <span className={styles['checkout__step--done']}>✓ 1 Panier ✓</span>
                    <span className={styles['checkout__step--active']}>🚴 2 Livraison</span>
                    <span className={styles['checkout__step']}>3 Paiement</span>
                </div>

                <div className={styles['checkout__layout']}>
                    <div className={styles['checkout__left']}>
                        <Order onSubmit={onSubmit} />

                        <div className={styles['checkout__card']}>
                            <div className={styles['checkout__cardHead']}>
                                <span className={styles['checkout__icon']}>💳</span>
                                <div><h2>Paiement</h2><p>Choisis ton moyen de paiement.</p></div>
                            </div>

                            <div className={styles['checkout__payMethods']}>
                                <button type="button" className={method === 'card' ? styles['checkout__payMethod--active'] : styles['checkout__payMethod']} onClick={() => setMethod('card')}>💳 Carte</button>
                                <button type="button" className={method === '【entity-paypal¦canonical_name=PayPal】' ? styles['checkout__payMethod--active'] : styles['checkout__payMethod']} onClick={() => setMethod('【entity-paypal¦canonical_name=PayPal】')}>【entity-PayPal¦canonical_name=PayPal】</button>
                                <button type="button" className={method === 'apple' ? styles['checkout__payMethod--active'] : styles['checkout__payMethod']} onClick={() => setMethod('apple')}>📱 Apple Pay</button>
                            </div>

                            {method === 'card' && (
                                <>
                                    <label className={styles['checkout__label']}>Numéro de carte</label>
                                    <div className={styles['checkout__input']}>
                                        <CardNumberElement options={{ style: { base: { fontSize: '14px' } } }} />
                                    </div>

                                    <div className={styles['checkout__row']}>
                                        <div className={styles['checkout__field']}>
                                            <label className={styles['checkout__label']}>Date d'expiration</label>
                                            <div className={styles['checkout__input']}>
                                                <CardExpiryElement options={{ style: { base: { fontSize: '14px' } } }} />
                                            </div>
                                        </div>
                                        <div className={styles['checkout__field']}>
                                            <label className={styles['checkout__label']}>CVC</label>
                                            <div className={styles['checkout__input']}>
                                                <CardCvcElement options={{ style: { base: { fontSize: '14px' } } }} />
                                            </div>
                                        </div>
                                    </div>

                                    <label className={styles['checkout__label']}>Nom sur la carte</label>
                                    <input className={styles['checkout__input']} placeholder="LÉA MARTIN" />

                                    <p className={styles['checkout__secureSmall']}>✓ Tes coordonnées sont chiffrées. Pizza Earth ne stocke jamais ton numéro de carte.</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className={styles['checkout__recap']}>
                        <h2>Récapitulatif <span>{cart.length} articles</span></h2>
                        {cart.map((p) => (
                            <div key={p.id} className={styles['checkout__recapItem']}>
                                <Image src={p.pictures?.[0]?.url} alt={p.name} className={styles['checkout__recapImg']} height={45} width={45} />
                                <div>
                                    <b>{p.name} <span className={styles['checkout__qty']}>x{p.quantity}</span></b>
                                    <p>{p.description}</p>
                                </div>
                                <b>{(p.price * p.quantity).toFixed(2)}€</b>
                            </div>
                        ))}
                        <div className={styles['checkout__line']}><span>Sous-total</span><span>{totalCart().toFixed(2)}</span></div>
                        <div className={styles['checkout__line']}><span>Livraison (30 min)</span><span>{deliveryPrice.toFixed(2)}€</span></div>
                        <div className={styles['checkout__total']}><span>Total</span><span>{totalDelivered().toFixed(2)}€</span></div>

                        {/* Validation Payment */}
                        {paymentError && <p className={styles['checkout__error']}>{paymentError}</p>}
                        {paymentSuccess && <p className={styles['checkout__success']}>{paymentSuccess}</p>}
                        {/* Validation RDV */}
                        {successMessage && <p className={styles['checkout__success']}>{successMessage}</p>}
                        {errorMessage && <p className={styles['checkout__error']}>{errorMessage}</p>}

                        <button type="submit" form="order-form" className={styles['checkout__pay']}>
                            Payer {totalDelivered().toFixed(2)}€ →
                        </button>
                        <p className={styles['checkout__secure']}>🔒 Paiement sécurisé • Stripe</p>
                    </div>
                </div>

                <Link href="/cart" className={styles['checkout__back']}>← Retour au panier</Link>
                <div className={styles['checkout__encrypted__payment']}>
                    <span>Pizza Earth • Paiement chiffré • Commande enregistrée de façon durable.</span>
                </div>
            </div>
        </main>
    );
}

export default function Payment() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
}