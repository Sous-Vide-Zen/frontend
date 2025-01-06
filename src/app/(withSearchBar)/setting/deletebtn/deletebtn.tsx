'use client'

import styles from './deletebtn.module.scss'

export default function ButtonDelete() {
  return (
    <div className={styles.btnDeleteContainer}>
      <button className={styles.btnDelete}>Удалить аккаунт</button>
    </div>
  )
}
