'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import styles from './authForms.module.scss'
import LinkLikeButton from '@/components/ui/LinkLikeButton/LinkLikeButton'

export default function UserDataSaveSuccessfullForm() {
  const router = useRouter()

  return (
    <div className={styles.wrapper}>
      <Image
        src="/img/check/clarity_success-standard-solid.svg"
        alt="check"
        width={80}
        height={80}
        draggable={false}
        priority
      />
      <div className={styles.inner_text}>
        <h2>Ваши данные сохранены!</h2>
        <p>Новые данные будут отражены на вашей странице.</p>
        <p style={{ paddingTop: '48px' }}>
          <LinkLikeButton href="/" size="big" color="primary">
            На главную
          </LinkLikeButton>
        </p>
      </div>
    </div>
  )
}
