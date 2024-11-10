'use client'

import { FC } from 'react'

import styles from './TopAuthor.module.scss'
import AuthorPreview from '../AuthorPreview'

const TopAuthor: FC = () => {
  return (
    <div className={styles.topAuthor}>
      <h2>Авторы дня</h2>
      <div className={styles.authors}>
        <AuthorPreview img="/img/author.svg" username="username" />
        <AuthorPreview img="/img/author.svg" username="username" />
        <AuthorPreview img="/img/author.svg" username="username" />
      </div>
    </div>
  )
}

export default TopAuthor
