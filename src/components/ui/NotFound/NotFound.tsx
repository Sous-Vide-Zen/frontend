'use client'

import styles from './notFound.module.scss'
import LinkLikeButton from '@/components/ui/LinkLikeButton/LinkLikeButton'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.error}>
        <h1 className={styles.title_text}>404</h1>
        <p className={styles.full_text}>
          Страница не найдена. Что-то пошло не так...
        </p>
        <div className={styles.like_button}>
          <LinkLikeButton size="big" color="primary" href="/">
            На главную
          </LinkLikeButton>
        </div>
      </div>
      {/* <ButtonBack /> */}
    </div>
  )
}
