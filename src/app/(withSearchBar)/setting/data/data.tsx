'use client'

import styles from './data.module.scss'
import Image from 'next/image'

export default function Data() {
  return (
    <div className={styles.container}>
      <h3 className={styles.dataTitle}>Настройки</h3>
      <div className={styles.dataContainer}>
        <div className={styles.dataTopContent}>
          <h2 className={styles.dataContentTitle}>Данные аккаунта</h2>
          <p className={styles.dataContentText}>Видны только вам</p>
        </div>
        <div className={styles.dataBottomContent}>
          <div className={styles.dataTextBox}>
            <div className={styles.dataIcon}>
              <Image
                alt="mail"
                src={'/img/mail.svg'}
                width={40}
                height={40}
                draggable={false}
              />
            </div>
            <div className={styles.dataBottomTextContent}>
              <p className={styles.bottomTitle}>Текущая почта</p>
              <p className={styles.bottomText}>iv****@gmail.ru</p>
            </div>
            <span className={styles.dataSpanText}>Изменить</span>
          </div>
          <div className={styles.dataTextBox}>
            <div className={styles.dataIcon}>
              <Image
                alt="password"
                src={'/img/password.svg'}
                width={40}
                height={40}
                draggable={false}
              />
            </div>
            <div className={styles.dataBottomTextContent}>
              <div className={styles.dataBottomTextContent}>
                <p className={styles.bottomTitle}>Пароль</p>
                <p className={styles.bottomText}>*********</p>
              </div>
              <span className={styles.dataSpanText}>Изменить</span>
            </div>
          </div>
          <div className={styles.dataTextBox}>
            <div className={styles.dataIcon}>
              <Image
                alt="safe"
                src={'/img/safe.svg'}
                width={40}
                height={40}
                draggable={false}
              />
            </div>
            <div className={styles.dataBottomTextContent}>
              <div className={styles.dataBottomTextContent}>
                <p className={styles.bottomTitleYa}>
                  Настройки при регистрации Яндекс/Вконтакте
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
