'use client'

import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from '../forms.module.scss'
import { useLazyGetUserDataQuery } from '@/store/features/user/user.actions'
import { Field, FieldSet, InputPhone, Selector } from '@/components/forms/items'
import { useGetCurentUserDataQuery } from '@/store/features/auth/auth.actions'
import { AvatarImage } from '@/components/ui/imageLoaders/AvatarImage'
import Input from '@/components/ui/Input/Input'
import Button from '@/components/ui/Button/Button'

export interface IDataForm {
  username: string
  display_name: string
  first_name: string
  last_name: string
  phone: string
  country: string
  city: string
  bio: string
  avatar: string
}

type Props = {
  isLoading?: boolean
  onSubmit?: SubmitHandler<IDataForm>
  onCancel?: () => void
  errorText?: string
}

const AboutMeForm: FC<Props> = ({
  isLoading,
  onSubmit,
  onCancel,
  errorText,
}) => {
  const { data: currentUserData } = useGetCurentUserDataQuery()
  const [trigger, { data }] = useLazyGetUserDataQuery()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<IDataForm>({
    mode: 'onBlur',
  })

  useEffect(() => {
    const username = currentUserData?.username
    if (username) {
      trigger(username)
    }
  }, [currentUserData?.username, trigger])

  useEffect(() => {
    if (data) {
      setValue('username', data.username)
    }
  }, [data, setValue])

  return (
    <div className={styles.container} style={{ width: '450px' }}>
      <form onSubmit={onSubmit && handleSubmit(onSubmit)}>
        <FieldSet label="Расскажите о себе">
          {/* это возможно возможно 'display_name' */}
          <Field label="Никнейм" error={errors?.username?.message}>
            <Input
              register={register}
              name="username"
              autocomplete="username"
              options={{
                maxLength: {
                  message: 'Поле не должно содержать более 30 символов',
                  value: 30,
                },
                required: 'Обязательное поле',
              }}
            />
          </Field>

          <Field label="Имя" error={errors?.first_name?.message}>
            <Input
              register={register}
              name="first_name"
              autocomplete="first_name"
              placeholder="Иван"
              options={{
                maxLength: {
                  message: 'Поле не должно содержать более 30 символов',
                  value: 30,
                },
              }}
            />
          </Field>

          <Field label="Фамилия" error={errors?.last_name?.message}>
            <Input
              register={register}
              name="last_name"
              autocomplete="last_name"
              placeholder="Иванов"
              options={{
                maxLength: {
                  message: 'Поле не должно содержать более 30 символов',
                  value: 30,
                },
              }}
            />
          </Field>

          <Field label="Телефон" error={errors?.phone?.message}>
            <InputPhone
              register={register}
              setValue={setValue}
              name="phone"
              autoComplete="phone"
            />
          </Field>

          <Field label="Страна" error={errors?.country?.message}>
            <Selector
              register={register}
              name="country"
              autoComplete="country"
              placeholder="Россия"
              className={styles.selector}
            />
          </Field>

          <Field label="Город" error={errors?.city?.message}>
            <Input
              register={register}
              name="city"
              autocomplete="city"
              placeholder="Москва"
              options={{
                maxLength: {
                  message: 'Поле не должно содержать более 30 символов',
                  value: 30,
                },
              }}
            />
          </Field>

          <Field label="О себе" error={errors?.bio?.message}>
            <Input
              register={register}
              name="bio"
              autocomplete="bio"
              options={{
                maxLength: {
                  message: 'Поле не должно содержать более 30 символов',
                  value: 30,
                },
              }}
            />
          </Field>

          <AvatarImage />
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

        <Button size={'medium'} color={'secondary'} onClick={onCancel}>
          Заполнить позже
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

export default AboutMeForm
