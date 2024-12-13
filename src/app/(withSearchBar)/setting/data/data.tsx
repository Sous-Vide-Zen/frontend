'use client'

import styles from './data.module.scss'
// import Image from 'next/image'

export default function Data() {
  return (
    <div className={styles.container}>
      <h3 className={styles.dataSettingsTitle}>Настройки</h3>
      <div className={styles.dataSettingsContainer}>
        <div className={styles.dataSettingsTopContent}>
          <h2 className={styles.dataSettingsContentTitle}>Данные аккаунта</h2>
          <p className={styles.dataSettingsContentText}>Видны только вам</p>
        </div>
      </div>
    </div>
  )
}
