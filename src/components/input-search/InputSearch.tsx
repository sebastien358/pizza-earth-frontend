import styles from './InputSearch.module.scss';

interface InputSearchProps {
    productSearch: (e: string) => Promise<void>
    term: string | null
    placeholder: string | null
}

export default function InputSearch({ productSearch, term, placeholder }: InputSearchProps) {
    return (
        <main className={styles['search']}>
            <input
                type={"text"}
                value={term} onChange={(e) => productSearch(e.target.value)}
                placeholder={placeholder ?? ''}
            />
        </main>
    )
}