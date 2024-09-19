'use client'

import Link from 'next/link'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import styles from './forms.module.scss'
import { loginUser } from '@/store/features/auth/auth.slice'
import { useAppDispatch } from '@/store/features/hooks'
import { useLoginMutation } from '@/store/features/auth/auth.actions'
import { Field, FieldSet, InputEmail, InputPassword } from './items'
import Button from '@/components/ui/Button/Button'
import Input from '@/components/ui/Input/Input'
import SocialForm from '@/components/ui/Socials/SocialForm'

type FormValues = {
  email: string
  password: string
  isAlien?: boolean
}

const LoginForm: FC = () => {
  const dispatch = useAppDispatch()
  const [doLogin, { data, status, isLoading, error }] = useLoginMutation()
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
    if (status === 'fulfilled') {
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
            <InputEmail register={register} id="email" />
          </Field>

          <Field
            label="Пароль"
            toTheRightLabel={
              <Link href="/todo-resetpassword">Забыли пароль?</Link>
            }
            error={errors.password?.message}
          >
            <InputPassword
              register={register}
              id="password"
              autocomplete="current-password"
            />
          </Field>

          <Field>
            <span className={styles.left}>
              <Input register={register} name="isAlien" type="checkbox" />
              Чужой компьютер
            </span>
          </Field>
        </FieldSet>

        <Button
          disabled={!isDirty || !isValid}
          type="submit"
          color="primary"
          size="big"
          loading={isLoading}
        >
          Войти
        </Button>

        {errorText && (
          <span role="alert" className={styles.error}>
            {errorText}
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
