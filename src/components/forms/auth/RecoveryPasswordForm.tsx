'use client'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import styles from '../forms.module.scss'
import { useResetPasswordConfirmMutation } from '@/store/features/auth/auth.actions'
import { Field, FieldSet, InputPassword } from '@/components/forms/items'
import Button from '@/components/ui/Button/Button'
import Input from '@/components/ui/Input/Input'
import ActivateInstructionForm from './ActivateInstructionForm'

type FormValues = {
  password: string
  password2: string
}

/* 
todo: uid и token наверное брать из ссылки. Пока проверить невозможно 
*/

const RecoveryPasswordForm: FC = () => {
  const router = useRouter()
  const [doReset, { status, isLoading, error }] =
    useResetPasswordConfirmMutation()
  // @ts-ignore
  const errorText = error?.data.email
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onBlur',
  })

  const onSubmit = (formValues: FormValues) => {
    doReset({ uid: '', token: '', new_password: formValues.password })
  }

  const pswd = watch('password')

  if (status === 'fulfilled')
    return (
      <div className={styles.centerContainer}>
        <ActivateInstructionForm />
      </div>
    )

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet label="Восстановление пароля">
          <Field label="Новый пароль" error={errors.password?.message}>
            <InputPassword
              register={register}
              id="password"
              autocomplete="new-password"
            />
          </Field>

          <Field
            label="Введите пароль еще раз"
            error={errors.password2?.message}
          >
            <Input
              register={register}
              name="password2"
              type="password"
              autocomplete="new-password"
              placeholder="*********"
              options={{
                required: 'Обязательное поле',
                validate: (value) => value === pswd || 'Пароли не совпадают',
              }}
            />
          </Field>
        </FieldSet>

        <Button
          disabled={!isDirty || !isValid}
          type="submit"
          color="primary"
          size="medium"
          loading={isLoading}
        >
          Сохранить
        </Button>

        {errorText && (
          <span role="alert" className={styles.error}>
            {errorText}
          </span>
        )}
      </form>
    </div>
  )
}

export default RecoveryPasswordForm
