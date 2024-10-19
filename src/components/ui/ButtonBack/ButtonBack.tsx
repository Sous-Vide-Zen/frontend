'use client'

import { useRouter } from 'next/navigation'
import styles from './ButtonBack.module.scss'
import { FC } from 'react'

const ButtonBack: FC = () => {
  const router = useRouter()

  return (
    <button className={styles.button} onClick={() => router.back()}>
      {`<--`} Назад
    </button>
  )
}

export default ButtonBack
