'use client'

import { FC, useEffect } from 'react'
import { Controller, RegisterOptions, useForm } from 'react-hook-form'
import cn from 'clsx'
import Select from 'react-select'

import formStyles from '../forms.module.scss'
import styles from './AboutMeForm.module.scss'
import {
  useLazyGetUserDataQuery,
  usePatchUserDataMutation,
} from '@/store/features/user/user.actions'
import { UserPatchData } from '@/store/features/user/user.types'
import { Field, FieldSet, InputPhone } from '@/components/forms/items'
import { useGetCurentUserDataQuery } from '@/store/features/auth/auth.actions'
import { AvatarImage } from '@/components/ui/imageLoaders/AvatarImage'
import Input from '@/components/ui/Input/Input'
import Button from '@/components/ui/Button/Button'
import LinkLikeButton from '@/components/ui/LinkLikeButton/LinkLikeButton'
import { Loader } from '@/components/ui/Loader/Loader'
import UserDataSaveSuccessfullForm from '@/components/forms/auth/UserDataSaveSuccessfullForm'
import { COUNTRIES } from '@/helpers/countries'

const textOptions: RegisterOptions<any> = {
  maxLength: {
    message: 'Поле не должно содержать более 30 символов',
    value: 30,
  },
  required: 'Обязательное поле',
  pattern: {
    value: /^[A-Za-zА-Яа-яЁё/ -]+$/i,
    message: 'Введите корректное значение (буквы, "-", " ")',
  },
}

type Props = {
  // isLoading?: boolean
  // errorText?: string
}

const AboutMeForm: FC<Props> = ({}) => {
  const {
    data: currentUserData,
    isLoading,
    error,
  } = useGetCurentUserDataQuery()

  //todo: после реализации хранения токенов доступа перенести заполнение данных пользователя в страницу
  const [getUserData, { data, isLoading: isLoading2, error: error2 }] =
    useLazyGetUserDataQuery()

  const [
    patchUserData,
    { data: patchData, isLoading: isPatchLoading, error: patchError },
  ] = usePatchUserDataMutation()

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<UserPatchData>({
    mode: 'onBlur',
  })

  // @ts-ignore
  const patchErrorText = patchError?.data ?? {}

  useEffect(() => {
    const username = currentUserData?.username
    if (username) {
      getUserData(username)
    }
  }, [currentUserData?.username, getUserData])

  useEffect(() => {
    if (data) {
      const {
        id,
        username,
        email,
        avatar,
        date_joined,
        is_active,
        is_admin,
        is_banned,
        is_staff,
        ...userData
      } = data
      for (let u in userData) {
        //@ts-ignore
        setValue(u, data[u])
      }
      setValue('phone', data.phone.split('+').join(''))
    }
  }, [data, setValue])

  const onSubmit = (dataFromInput: UserPatchData) => {
    if (dataFromInput) {
      patchUserData({
        userName: currentUserData?.username ?? '',
        body: { ...dataFromInput, phone: `+${dataFromInput.phone}` },
      })
    }
  }

  if (error) return `error ${error}`

  if (error2) return `error ${error2}`

  if (isLoading || isLoading || !data) return <Loader />

  //todo: форму поместить в модальное окно
  if (patchData) return <UserDataSaveSuccessfullForm />

  return (
    <div className={cn(formStyles.container, { [styles.condensedForm]: true })}>
      <form onSubmit={onSubmit && handleSubmit(onSubmit)}>
        <FieldSet label="Расскажите о себе">
          <Field
            label="Никнейм"
            error={errors?.display_name?.message || patchErrorText.display_name}
          >
            <Input
              register={register}
              name="display_name"
              autocomplete="display_name"
              options={textOptions}
            />
          </Field>

          <Field
            label="Имя"
            error={errors?.first_name?.message || patchErrorText.first_name}
          >
            <Input
              register={register}
              name="first_name"
              autocomplete="first_name"
              placeholder="Иван"
              options={textOptions}
            />
          </Field>

          <Field
            label="Фамилия"
            error={errors?.last_name?.message || patchErrorText.last_name}
          >
            <Input
              register={register}
              name="last_name"
              autocomplete="last_name"
              placeholder="Иванов"
              options={textOptions}
            />
          </Field>

          <Field
            label="Телефон"
            error={errors?.phone?.message || patchErrorText.phone}
          >
            <InputPhone
              register={register}
              value={getValues()['phone']}
              setValue={setValue}
              name="phone"
              autoComplete="phone"
            />
          </Field>

          <Field
            label="Страна"
            error={errors?.country?.message || patchErrorText.country}
          >
            <Controller
              name={'country'}
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Select
                  name={name}
                  options={COUNTRIES}
                  placeholder="Россия"
                  inputId={Date.now().toString()}
                  value={COUNTRIES.find((c) => c.value === value)}
                  onChange={(selectedOption) => {
                    onChange(selectedOption?.value)
                  }}
                />
              )}
            />
          </Field>

          <Field
            label="Город"
            error={errors?.city?.message || patchErrorText.city}
          >
            <Input
              register={register}
              name="city"
              autocomplete="city"
              placeholder="Москва"
              options={textOptions}
            />
          </Field>

          <Field
            label="О себе"
            error={errors?.bio?.message || patchErrorText.bio}
          >
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
          disabled={!isValid}
          type="submit"
          color="primary"
          size="medium"
          loading={isPatchLoading}
        >
          Сохранить
        </Button>

        <LinkLikeButton href="/" size="medium" color="secondary">
          Заполнить позже
        </LinkLikeButton>
      </form>
    </div>
  )
}

export default AboutMeForm
