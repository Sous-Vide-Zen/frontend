'use client'

import styles from './notFound.module.scss'
import ButtonBack from '@/components/ui/ButtonBack/ButtonBack'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.error}>
        <h1 className={styles.title_text}>404</h1>
        <p className={styles.full_text}>
          Страница не найдена. Что-то пошло не так...
        </p>
        <button className={styles.error_btn}>На главную</button>
      </div>

      <ButtonBack />
    </div>
  )
}
