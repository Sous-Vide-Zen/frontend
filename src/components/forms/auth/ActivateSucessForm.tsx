'use client'

import Image from 'next/image'

import styles from './authForms.module.scss'

export default function ActivateSucessForm() {
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
          <h2>Ваш аккаунт успешно зарегистрирован!</h2>
          <p>Добро пожаловать в мир су-вид.</p>
        </div>
      </div>
    </>
  )
}
