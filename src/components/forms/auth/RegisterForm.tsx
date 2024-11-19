'use client'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import cn from 'clsx'

import styles from '../forms.module.scss'
import { useRegisterMutation } from '@/store/features/auth/auth.actions'
import {
  Field,
  FieldSet,
  EmailFormInput,
  PasswordFormInput,
  FormInput,
} from '@/components/forms/items'
import { Button } from '@/components/ui/'
import SocialForm from '@/components/ui/Socials/SocialForm'
import ActivateInstructionForm from './ActivateInstructionForm'

type FormValues = {
  email: string
  password: string
  password2: string
  agree: boolean
}

const RegisterForm: FC = () => {
  const router = useRouter()
  const [doRegister, { status, isLoading, error }] = useRegisterMutation()
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
    doRegister(formValues)
  }

  const pswd = watch('password')

  if (status === 'fulfilled')
    return (
      <div className={styles.centerContainer}>
        <ActivateInstructionForm />
      </div>
    )

  return (
    <>
      <h1>Добро пожаловать в мир су-вид.</h1>

      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet label="Регистрация">
            <Field label="Email" error={errors.email?.message}>
              <EmailFormInput register={register} id="email" />
            </Field>

            <Field label="Пароль" error={errors.password?.message}>
              <PasswordFormInput
                register={register}
                id="password"
                autocomplete="new-password"
              />
            </Field>

            <Field
              label="Введите пароль еще раз"
              error={errors.password2?.message}
            >
              <FormInput
                register={register}
                id="password2"
                type="password"
                autocomplete="new-password"
                placeholder="*********"
                options={{
                  required: 'Обязательное поле',
                  validate: (value: string) =>
                    value === pswd || 'Пароли не совпадают',
                }}
              />
            </Field>

            <Field error={errors.agree?.message}>
              <div
                className={cn(styles.left, {
                  [styles.leftSmall]: true,
                })}
              >
                <input
                  {...register('agree', {
                    required: 'Обязательное поле',
                    validate: (value) => {
                      return value === true || 'Соглашение необходимо'
                    },
                  })}
                  id="agree"
                  type="checkbox"
                />
                Я соглашаюсь&nbsp;
                <Link href="/todo">с обработкой персональных данных</Link>
              </div>
            </Field>
          </FieldSet>

          <Button
            disabled={!isDirty || !isValid}
            type="submit"
            color="primary"
            size="medium"
            loading={isLoading}
          >
            Зарегистрироваться
          </Button>

          {errorText && (
            <span role="alert" className={styles.error}>
              {errorText}
            </span>
          )}
        </form>

        <p className={styles.center}>
          У вас уже есть аккаунт?<Link href="/login">Войти в аккаунт</Link>
        </p>

        <SocialForm />
      </div>
    </>
  )
}

export default RegisterForm
