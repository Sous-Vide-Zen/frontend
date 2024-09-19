'use client'

import Image from 'next/image'
import Link from 'next/link'

import styles from './authForms.module.scss'

export default function AlreadyActivatedForm() {
  return (
    <>
      <div className={styles.wrapper}>
        <Image
          src="/img/check/clarity_success-standard-solid.svg"
          alt="check"
          width={80}
          height={80}
          draggable={false}
          priority
        />
        <div className={styles.inner_text}>
          <h2>Данная ссылка уже была использована для активации</h2>
          <p><Link href="/login">Войти в систему?</Link></p>
        </div>
      </div>
    </>
  )
}
