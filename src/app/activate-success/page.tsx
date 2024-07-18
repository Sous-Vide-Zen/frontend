"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './activate-success.module.scss';

export default function Activate() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/user-data-form")
        }, 4000);

        
        return () => clearTimeout(timer);
    }, [router]); 

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