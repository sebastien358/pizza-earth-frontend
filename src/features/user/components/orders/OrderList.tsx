"use client"

import styles from './OrderList.module.scss'

import {useOrderStore} from "@/store/user/order.store";
import {useEffect} from "react";
import Pagination from "@/components/pagination/Pagination";

export default function OrderList() {

    {/* Store Order */}

    const { orderList, previousPage, followingPage, orders, isLoading, current, countUserOrders, pages } = useOrderStore()

    useEffect(() => {
        orderList()
    }, [orderList]);

    return (
        <main className={styles['orders']}>
            <div className={styles['orders__header']}>
                <h1 className={styles['orders__title']}>Les Commandes</h1>
                <p className={styles['orders__subtitle']}>{countUserOrders} commande{countUserOrders > 1 ? 's' : ''}</p>
            </div>

            {isLoading ? (
                <div className={styles['loader-container']}>
                    <span className={styles['loader']}></span>
                </div>
            ) : !isLoading && orders.length > 0 ? (
                <>
                    <div className={styles['orders__grid']}>
                        {orders.map((order) => (
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
                                    {order?.orderItems?.map((item: any) => (
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
                                    <span className={styles['orders__card__total']}>Total : {order.total}€</span>
                                    <span className={styles['orders__card__date']}>{new Date(order.createdAt).toLocaleDateString('fr-FR')} - N°{order.id}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                    {/* Pagination */}
                    {pages > 1 && (
                        <Pagination
                            current={current}
                            pages={pages}
                            previousPage={previousPage}
                            followingPage={followingPage}
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