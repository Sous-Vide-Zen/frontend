'use client'

import Link from 'next/link'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import styles from '../forms.module.scss'
import { loginUser } from '@/store/features/auth/auth.slice'
import { useAppDispatch } from '@/store/hooks'
import { useGetTokensMutation } from '@/store/features/auth/auth.actions'
import {
  Field,
  FieldSet,
  EmailFormInput,
  PasswordFormInput,
  FormInput,
} from '@/components/forms/items'
import { Button } from '@/components/ui'
import SocialForm from '@/components/ui/Socials/SocialForm'

type FormValues = {
  email: string
  password: string
  isAlien?: boolean
}

const LoginForm: FC = () => {
  const dispatch = useAppDispatch()
  const [doLogin, { data, status, isLoading, isError, error }] =
    useGetTokensMutation()

  // @ts-ignore
  const errorText = error?.message
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onBlur',
  })

  useEffect(() => {
    if (status === 'fulfilled' && data) {
      dispatch(loginUser(data))
    }
  }, [data, dispatch, status])

  const onSubmit = (formValues: FormValues) => {
    doLogin(formValues)
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <Field label="Email" error={errors.email?.message}>
            <EmailFormInput register={register} id="email" />
          </Field>

          <Field
            label="Пароль"
            toTheRightLabel={<Link href="/resetpassword">Забыли пароль?</Link>}
            error={errors.password?.message}
          >
            <PasswordFormInput
              register={register}
              id="password"
              autocomplete="current-password"
            />
          </Field>

          <Field>
            <span className={styles.left}>
              <FormInput register={register} id="isAlien" type="checkbox" />
              Чужой компьютер
            </span>
          </Field>
        </FieldSet>

        <Button
          disabled={!isDirty || !isValid}
          type="submit"
          color="primary"
          size="medium"
          loading={isLoading}
        >
          Войти
        </Button>

        {isError && (
          <span role="alert" className={styles.error}>
            {String(error)}
          </span>
        )}
      </form>

      <p className={styles.center}>
        Впервые на нашем сайте?
        <Link href="/registration">Создайте аккаунт</Link>
      </p>

      <SocialForm />
    </div>
  )
}

export default LoginForm
