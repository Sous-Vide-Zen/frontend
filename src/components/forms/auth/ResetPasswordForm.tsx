'use client'

import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from '../forms.module.scss'
import { Field, FieldSet, InputEmail } from '@/components/forms/items'
import Button from '@/components/ui/Button/Button'

type FormValues = {
  email: string
}

type Props = {
  isLoading: boolean
  onSubmit?: SubmitHandler<FormValues>
  onCancel?: () => void
  errorText?: string
}

const ResetPasswordForm: FC<Props> = ({
  isLoading,
  onSubmit,
  onCancel,
  errorText,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onBlur',
  })

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit && handleSubmit(onSubmit)}>
        <FieldSet label="Восстановление пароля">
          <Field label="Email" error={errors.email?.message}>
            <InputEmail register={register} id="email" />
          </Field>

          <Button
            disabled={!isDirty || !isValid}
            type="submit"
            color="primary"
            size="medium"
            loading={isLoading}
          >
            Продолжить
          </Button>

          <Button
            type="button"
            color="clear"
            size="medium"
            onClick={onCancel}
          >
            Отменить
          </Button>
        </FieldSet>

        {errorText && (
          <span role="alert" className={styles.error}>
            {errorText}
          </span>
        )}
      </form>
    </div>
  )
}

export default ResetPasswordForm
