'use client'

import Image from 'next/image'

import styles from './authForms.module.scss'

export default function ResetPasswordEmailedForm() {
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
          <h2>Вам отправлено письмо!</h2>
          <p>
            Для успешной смены пароля перейдите по ссылке, которую мы отправили
            вам в письме на электронную почту.
          </p>
        </div>
      </div>
    </>
  )
}
