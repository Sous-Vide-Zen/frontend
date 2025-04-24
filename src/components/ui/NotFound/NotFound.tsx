'use client'

import Layout from '@/components/layout/layout'
import styles from './notFound.module.scss'
import { LinkLikeButton } from '@/components/ui'

export default function NotFound() {
  return (
    <Layout
      sidebar={false}
      backButton={false}
      disablebackButtonFormForms={true}
      hideHeader={true}
      isSearch={true}
    >
      <div className={styles.container}>
        <div className={styles.errorContent}>
          <div className={styles.errorTextContent}>
            <h1 className={styles.errorTitle}>404</h1>
            <p className={styles.errorDescr}>
              Страница не найдена. Что-то пошло не так...
            </p>
          </div>
          <div className={styles.errorLinkButton}>
            <LinkLikeButton size="medium" color="primary" href="/">
              На главную
            </LinkLikeButton>
          </div>
        </div>
      </div>
    </Layout>
  )
}
