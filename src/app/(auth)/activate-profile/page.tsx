'use client'

//todo: не понятно зачем нужна эта страница
import Link from 'next/link'

import styles from './activate-profile.module.scss'

export default function ActivateProfile() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.inner_text}>
          <p>Вы успешно зарегистрировались</p>
          <div>
            На вашу электронную почту отправлено письмо. Для завершения
            регистрации временно, вам необходимо зайти в БД, и поставить флажок
            isActive, как выбранный, после этого, кликните на кнопку ниже для
            завершения регистрации.
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link href="/login">Авторизуйтесь!</Link>
        </div>
      </div>
    </div>
  )
}
