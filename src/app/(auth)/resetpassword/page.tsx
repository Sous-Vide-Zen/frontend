'use client'

import { useCallback, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

import styles from './activate.module.scss'
import {
  useActivationMutation,
  useResetPasswordMutation,
} from '@/store/features/auth/auth.actions'
import { ActivationUserData } from '@/store/features/user/user.types'
import ActivateSucessForm from '@/components/forms/auth/ActivateSucessForm'
import AlreadyActivatedForm from '@/components/forms/auth/AlreadyActivatedForm'
import ResetPasswordForm from '@/components/forms/auth/ResetPasswordForm'

const errorMessages: Record<string, string> = {
  "Invalid user id or user doesn't exist.": 'Некорректный ID',
  'Stale token for given user.':
    'Данная ссылка уже была использована для активации',
}

export default function ActivationPage() {
  const router = useRouter()
  const [doReset, { data, status, isLoading, isError, error }] =
    useResetPasswordMutation()

  console.log({ status })

  // useEffect(() => {
  //   doActivation(dataFromUrl)
  // }, [doActivation, params.slug])

  // useEffect(() => {
  //   if (status === 'fulfilled') {
  //     const timer = setTimeout(() => {
  //       router.push('activate-page')
  //     }, 4000)

  //     return () => clearTimeout(timer)
  //   }
  // }, [router, status])

  const onSubmit = (formValues: any) => {
    doReset(formValues)
  }

  const onCancel = () => {
    router.back()
  }

  // @ts-ignore
  const errorText = error?.message

  useCallback(() => {
    console.log({ status })
    if (status === 'fulfilled') {
      // dispatch(loginUser(data))
    }
  }, [status])

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

  // if (status === 'fulfilled')
  //   return (
  //     <div className={styles.container}>
  //       <ActivateSucessForm />
  //     </div>
  //   )

  return (
    <ResetPasswordForm
      isLoading={isLoading}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  )
}
