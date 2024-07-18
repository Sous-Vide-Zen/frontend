"use client"

import styles from './activate-success.module.scss';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function Activate() {
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            router.push("/user-data-form")
        }, 4000)
    }, [router])
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.inner_text}>
                    <p>
                        Ваш аккаунт успешно зарегистрирован!
                    </p>
                    <div>
                        Добро пожаловать в мир су-вид.
                    </div>
                </div>
            </div>
        </div>
    );
}
