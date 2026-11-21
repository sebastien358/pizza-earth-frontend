"use client"

import styles from './Commands.module.scss'

import {ChangeEvent, useEffect, useMemo, useState} from "react";
import {useOrderAdminStore} from "@/store/admin/orderAdmin.store";
import InputSearch from "@/components/input-search/InputSearch";
import Pagination from "@/components/pagination/Pagination";

const orderStatus = [
    {name: 'Tous', slug: 'tous'},
    {name: 'En attente', slug: 'pending'},
    {name: 'Validées', slug: 'validated'},
    {name: 'Annulées', slug: 'cancelled'},
    {name: 'Livraison', slug: 'delivery'},
    {name: 'Retrait', slug: 'pickup'},
]

const selectedStatus = [
    {name: 'En attente', slug: 'pending'},
    {name: 'Validées', slug: 'validated'},
    {name: 'Annulées', slug: 'cancelled'},
]

export default function Commands() {

    {/* Store Admin Order */}

    const { orderList, orderSearch, orderChangeStatus, orderDelete, previousPage, followingPage, orders, term, current, pages, isLoading } = useOrderAdminStore()

    useEffect(() => {
        orderList()
    }, [orderList]);

    const [selectedSlug, setSelectedSlug] = useState<string>('tous')

    function onClickStatus(status: string) {
        setSelectedSlug(status)
    }

    const filteredOrders = useMemo(() => {
        if (!Array.isArray(orders)) return []
        return orders?.filter((o: any) => {
            if (selectedSlug === 'tous') return true
            if (selectedSlug === 'pickup' || selectedSlug === 'delivery') return o.deliveryMode === selectedSlug
            return o.status === selectedSlug
        })
    }, [orders, selectedSlug]);

    {/* Changement du status de la commande */}

    async function changeStatus(id: number, e: ChangeEvent<HTMLSelectElement>) {
        try {
            await orderChangeStatus(id, e.target.value)
        } catch (err : any) {
            console.error(err)
            throw err
        }
    }

    {/* Delete Command */}

    async function deleteOrder(id: number) {
        try {
            await orderDelete(id)
        } catch (err : any) {
            console.error(err)
            throw err
        }
    }

    return (
        <main className={styles['orders']}>
            <div className={styles['orders__header']}>
                <h1 className={styles['orders__title']}>Les Commandes</h1>
                <p className={styles['orders__subtitle']}>{orders.length} commande{orders.length > 1 ? 's' : ''}</p>
            </div>

            <div className={styles['orders__search']}>
                <InputSearch search={orderSearch} term={term ?? ""} placeholder={"Rechercher une commande..."} />
            </div>

            <div className={styles['orders__filters']}>
                {orderStatus.map((o) =>
                    <button
                        key={o.slug}
                        className={o.slug === selectedSlug ? styles['orders__filters__btn--active'] : styles['orders__filters__btn']}
                        onClick={() => onClickStatus(o.slug)}
                    >
                        {o.name}
                    </button>
                )}
            </div>

            {isLoading ? (
                <div className={styles['loader-container']}>
                    <span className={styles['loader']}></span>
                </div>
            ) : !isLoading && filteredOrders.length > 0 ? (
                <>
                    <div className={styles['orders__grid']}>
                        {filteredOrders.map((order: any) => (
                            <article key={order.id} className={styles['orders__card']}>
                                <div className={styles['orders__card__top']}>
                                <span className={`${styles['orders__card__status']} ${styles[`orders__card__status--${order.status}`]}`}>
                                  {order.status === 'pending' ? 'En attente' : order.status === 'validated' ? 'Validée' : 'Annulée'}
                                </span>
                                    <span className={styles['orders__card__mode']}>
                                    {order.deliveryMode === 'delivery' ? 'Livraison' : 'Retrait'}
                                </span>
                                </div>

                                <h2 className={styles['orders__card__name']}>{order.name}</h2>

                                <div className={styles['orders__card__items']}>
                                    {order.orderItems.map((item: any) => (
                                        <p key={item.id}>
                                            <span>{item.product.name}</span>
                                            <span>x {item.quantity}</span>
                                        </p>
                                    ))}
                                </div>

                                <p className={styles['orders__card__meta']}>{order.email} - {order.phone}</p>
                                <p className={styles['orders__card__address']}>
                                    {order.address} - {order.postalCode} {order.city}
                                </p>
                                {order.complementAddress && (
                                    <p className={styles['orders__card__address']}>{order.complementAddress}</p>
                                )}
                                {order.deliveryInstructions && (
                                    <p className={styles['orders__card__note']}>📝 {order.deliveryInstructions}</p>
                                )}

                                <div className={styles['orders__footer']}>
                                    <span className={styles['orders__card__total']}>Total : {order.total.toFixed(2)}€</span>
                                    <span className={styles['orders__card__date']}>{new Date(order.createdAt).toLocaleDateString('fr-FR')} - N°{order.id}</span>
                                </div>

                                <div className={styles['orders__card__actions']}>

                                    <select onChange={(e) => changeStatus(order.id, e)} className={`${styles['orders__card__select']} ${styles[`orders__card__select--${order.status}`]}`} value={order.status}>
                                        {selectedStatus.map((select) =>
                                            <option key={select.slug} value={select.slug}>{select.name}</option>
                                        )}
                                    </select>

                                    <button
                                        className={styles['orders__card__btn--delete']}
                                        onClick={() => deleteOrder(order.id)}
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                    {/* Pagination */}
                    {pages > 1 && (
                        <Pagination
                            previousPage={previousPage}
                            followingPage={followingPage}
                            current={current}
                            pages={pages}
                        />
                    )}
                </>
            ) : (
                <div className={styles.empty}>
                    <p>Aucune commande dans ce status pour le moment.</p>
                </div>
            )}
        </main>
    )
}