'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

import styles from './activate.module.scss'
import { useActivationMutation } from '@/store/features/auth/auth.actions'
import { ActivationUserData } from '@/store/features/user/user.types'
import ActivateSucessForm from '@/components/forms/auth/ActivateSucessForm'
import AlreadyActivatedForm from '@/components/forms/auth/AlreadyActivatedForm'

const errorMessages: Record<string, string> = {
  "Invalid user id or user doesn't exist.": 'Некорректный ID',
  'Stale token for given user.':
    'Данная ссылка уже была использована для активации',
}

export default function ActivationPage() {
  const params = useParams()
  const router = useRouter()
  const [doActivation, { status, isLoading, isError, error }] =
    useActivationMutation()

  useEffect(() => {
    const dataFromUrl: ActivationUserData = {
      uid: params.slug[0],
      token: params.slug[1],
    }

    doActivation(dataFromUrl)
  }, [doActivation, params.slug])

  useEffect(() => {
    if (status === 'fulfilled') {
      const timer = setTimeout(() => {
        router.push('activate-page')
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [router, status])

  if (isLoading)
    return (
      <div className={styles.container}>
        <p>Получение данных...</p>
      </div>
    )

  if (isError) {
    const { data: errorData } = error as { data: any }
    const { uid: errorText } = errorData

    return (
      <div className={styles.container}>
        {errorText === 'Stale token for given user.' ? (
          <AlreadyActivatedForm />
        ) : (
          <div className={styles.error}>
            {errorMessages[errorText] ?? JSON.stringify(errorData)}
          </div>
        )}
      </div>
    )
  }

  if (status === 'fulfilled')
    return (
      <div className={styles.container}>
        <ActivateSucessForm />
      </div>
    )
}
