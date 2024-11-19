'use client'

import { FC } from 'react'
import Image from 'next/image'

import styles from './Author.module.scss'

type Props = {
  img?: string
  username?: string
}

const AuthorPreview: FC<Props> = ({ img, username }) => {
  return (
    <div className={styles.author}>
      <Image
        alt="eye"
        src={img || '/img/author.svg'}
        width={40}
        height={40}
        draggable={false}
      />
      <span>{username}</span>
    </div>
  )
}

export default AuthorPreview
