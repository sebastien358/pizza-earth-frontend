import styles from './InputSearch.module.scss';
import {ChangeEvent} from "react";

interface InputSearchProps {
    search: (e: string) => Promise<void>
    term: string | null
    placeholder: string | null
}

export default function InputSearch({ search, term, placeholder }: InputSearchProps) {

    async function onChangeSearch(e: ChangeEvent<HTMLInputElement>) {
        await search(e?.target?.value)
    }

    return (
        <main className={styles['search']}>
            <input
                type={"text"}
                value={term ?? ""}
                onChange={(e) => onChangeSearch(e)}
                placeholder={placeholder ?? ''}
            />
        </main>
    )
}