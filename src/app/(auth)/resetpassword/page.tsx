'use client'

import { useRouter } from 'next/navigation'

import styles from './resetPassword.module.scss'
import { useResetPasswordMutation } from '@/store/features/auth/auth.actions'
import ResetPasswordForm from '@/components/forms/auth/ResetPasswordForm'
import ResetPasswordEmailedForm from '@/components/forms/auth/ResetPasswordEmailedForm'

export default function ActivationPage() {
  const router = useRouter()
  const [doReset, { status, isLoading, error }] = useResetPasswordMutation()

  if (status === 'fulfilled')
    return (
      <div className={styles.container}>
        <ResetPasswordEmailedForm />
      </div>
    )

  return (
    <ResetPasswordForm
      isLoading={isLoading}
      onSubmit={(formValues) => doReset(formValues)}
      onCancel={() => router.back()}
      errorText={error ? String(error) : undefined}
    />
  )
}
