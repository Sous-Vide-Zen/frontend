'use client'

import Image from 'next/image'

import styles from './activate-instruction.module.scss'

export default function Activate() {
  return (
    <div className={styles.container}>
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
          <h2>Вам отправлено письмо!</h2>
          <p>
            Для завершения регистрации перейдите по ссылке, которую мы отправили
            вам в письме на электронную почту.
          </p>
        </div>
      </div>
    </div>
  )
}
