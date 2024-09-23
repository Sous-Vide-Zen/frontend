'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import styles from './authForms.module.scss'
import Button from '@/components/ui/Button/Button'

export default function RecoveryPasswordSuccessfullForm() {
  const router = useRouter()

  return (
    <>
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
          <h2>Ваш пароль успешно обновлен!</h2>
          <p>
            <Button
              type="submit"
              color="primary"
              size="big"
              onClick={() => {
                router.push('welcomeback')
              }}
            >
              Продолжить
            </Button>
          </p>
        </div>
      </div>
    </>
  )
}
