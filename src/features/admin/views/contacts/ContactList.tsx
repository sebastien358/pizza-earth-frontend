'use client';

import { useMemo, useState } from 'react';
import { Mail, Reply, Trash2 } from 'lucide-react';
import styles from './ContactList.module.scss';

type Contact = {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
};

type Kind = 'order' | 'claim' | 'partner' | 'other';

const FILTERS: { key: 'all' | Kind; label: string }[] = [
    { key: 'all', label: 'Tous' },
    { key: 'order', label: 'Commandes' },
    { key: 'claim', label: 'Réclamations' },
    { key: 'partner', label: 'Partenariats' },
    { key: 'other', label: 'Autres' },
];

// À supprimer quand le store est branché
const DEMO: Contact[] = [
    { id: 1, name: 'Sophie Lambert', email: 'sophie@email.com', subject: 'Question sur une commande', message: 'Ma commande n°22 est arrivée froide, pouvez-vous me rappeler ?', createdAt: '2026-11-26T14:23:00' },
    { id: 2, name: 'Ferme du Bocage', email: 'contact@fermebocage.fr', subject: 'Partenariat', message: 'Nous proposons des tomates et du fromage locaux, cultivés à moins de 20 km de Rugles. Seriez-vous intéressés par un partenariat pour approvisionner votre pizzeria ? Nous pouvons vous envoyer des échantillons.', createdAt: '2026-11-25T09:10:00' },
    { id: 3, name: 'Mehdi Rahmani', email: 'mehdi@email.com', subject: 'Réclamation', message: 'Il manquait une boisson dans ma livraison de vendredi.', createdAt: '2026-11-24T18:45:00' },
];

function getKind(subject: string): Kind {
    if (/commande/i.test(subject)) return 'order';
    if (/réclam/i.test(subject)) return 'claim';
    if (/partenar/i.test(subject)) return 'partner';
    return 'other';
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Paris', // évite l'écart serveur/client (hydratation)
    });
}

function ContactCard({ contact, onDelete }: { contact: Contact; onDelete: (id: number) => void }) {
    const [open, setOpen] = useState(false);
    const kind = getKind(contact.subject);
    const isLong = contact.message.length > 160;



    return (
        <li className={styles['card']}>
            <div className={styles['card__top']}>
        <span className={`${styles['card__badge']} ${styles[`card__badge--${kind}`]}`}>
          {contact.subject}
        </span>
                <time className={styles['card__date']} dateTime={contact.createdAt}>
                    {formatDate(contact.createdAt)}
                </time>
            </div>

            <h2 className={styles['card__name']}>{contact.name}</h2>

            <a className={styles['card__email']} href={`mailto:${contact.email}`}>
                <Mail size={15} /> {contact.email}
            </a>

            <div className={styles['card__message']}>
                <span className={styles['card__label']}>Message</span>
                <p className={`${styles['card__text']} ${open ? styles['card__text--open'] : ''}`}>
                    {contact.message}
                </p>
                {isLong && (
                    <button type="button" className={styles['card__more']} onClick={() => setOpen(!open)}>
                        {open ? 'Voir moins' : 'Voir plus'}
                    </button>
                )}
            </div>

            <div className={styles['card__actions']}>
                <a
                    className={styles['card__reply']}
                    href={`mailto:${contact.email}?subject=${encodeURIComponent(`Re: ${contact.subject}`)}`}
                >
                    <Reply size={16} /> Répondre
                </a>
                <button type="button" className={styles['card__delete']} onClick={() => onDelete(contact.id)}>
                    <Trash2 size={16} /> Supprimer
                </button>
            </div>
        </li>
    );
}

export default function ContactList() {
    // TODO: remplace par ton store (contact.store.ts) et ton service (contactAdmin.service.ts)
    const [contacts, setContacts] = useState<Contact[]>(DEMO);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'all' | Kind>('all');

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return contacts.filter((c) => {
            const matchKind = filter === 'all' || getKind(c.subject) === filter;
            const matchSearch =
                !q ||
                c.name.toLowerCase().includes(q) ||
                c.email.toLowerCase().includes(q) ||
                c.message.toLowerCase().includes(q);
            return matchKind && matchSearch;
        });
    }, [contacts, search, filter]);

    const onDelete = (id: number) => {
        if (!window.confirm('Supprimer ce message ?')) return;
        setContacts((prev) => prev.filter((c) => c.id !== id));
        // TODO: appel API de suppression
    };

    return (
        <section className={styles['contacts']}>
            <header className={styles['contacts__header']}>
                <h1 className={styles['contacts__title']}>Les Contacts</h1>
                <p className={styles['contacts__count']}>
                    {filtered.length} message{filtered.length > 1 ? 's' : ''}
                </p>
            </header>

            <input
                type="search"
                className={styles['contacts__search']}
                placeholder="Rechercher un message..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Rechercher un message"
            />

            <div className={styles['filters']}>
                {FILTERS.map((f) => (
                    <button
                        key={f.key}
                        type="button"
                        className={`${styles['filters__btn']} ${filter === f.key ? styles['filters__btn--active'] : ''}`}
                        onClick={() => setFilter(f.key)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <p className={styles['contacts__empty']}>Aucun message pour le moment.</p>
            ) : (
                <ul className={styles['contacts__grid']}>
                    {filtered.map((c) => (
                        <ContactCard key={c.id} contact={c} onDelete={onDelete} />
                    ))}
                </ul>
            )}
        </section>
    );
}