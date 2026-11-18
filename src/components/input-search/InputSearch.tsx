import styles from './InputSearch.module.scss';
import {ChangeEvent} from "react";

interface InputSearchProps {
    productSearch: (e: string) => Promise<void>
    term: string | null
    placeholder: string | null
}

export default function InputSearch({ productSearch, term, placeholder }: InputSearchProps) {

    async function search(e: ChangeEvent<HTMLInputElement>) {
        await productSearch(e?.target?.value)
    }

    return (
        <main className={styles['search']}>
            <input
                type={"text"}
                value={term ?? ""}
                onChange={(e) => search(e)}
                placeholder={placeholder ?? ''}
            />
        </main>
    )
}