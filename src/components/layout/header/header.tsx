'use client'

import Link from 'next/link'
import Image from 'next/image'

import styles from './header.module.scss'
import {Input} from '@/components/ui'
import Avatar from './avatar/avatar'

export default function Header({ isSearch }: { isSearch: boolean | undefined }) {
    return (
        <div className={styles.header}>
            <div className="container">
                <div className={styles.logo}>
                    <Link href="/">
                        <Image src='/img/logo.svg' alt='logo' draggable={false} width={94} height={52} priority={true} />
                    </Link>
                </div>
                {isSearch &&
                    <>
                        <div className={styles.inputContainer}>
                            <Image
                                src="/img/search.svg"
                                width={24}
                                height={24}
                                alt="search"
                                className={styles.inputImg}
                                draggable={false}
                            />
                            <Input
                                placeholder="Искать..."
                                className={styles.input}
                            />
                        </div>
                        <Avatar/>
                    </>
                }
            </div>
        </div>
    )
}
