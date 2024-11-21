'use client'

import { FC, useEffect, useState } from 'react'
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
import {
  Field,
  FieldSet,
  FormInput,
  PhoneFormInput,
} from '@/components/forms/items'
import { useGetCurentUserDataQuery } from '@/store/features/auth/auth.actions'
import { AvatarImage } from '@/components/ui/imageLoaders/AvatarImage'
import { Button, LinkLikeButton } from '@/components/ui/'
import { Loader } from '@/components/ui/Loader/Loader'
import UserDataSaveSuccessfullForm from '@/components/forms/auth/UserDataSaveSuccessfullForm'
import { COUNTRIES } from '@/helpers/countries'

/*
 с телефоном пришлось "изобретать велосипед" с допонительнми полями {setValue, getValues},
 т.к. не получилось получить доступ к register.ref и отследить его изменение
*/

const displayNameOptions: RegisterOptions<any> = {
  maxLength: {
    message: 'Поле не должно содержать более 30 символов',
    value: 30,
  },
  pattern: {
    value: /^[\wа-яА-ЯЁё@.+\-_]+$/i,
    message: 'Введите корректное значение (буквы, цифры, "@ + - _")',
  },
}

const textOptions: RegisterOptions<any> = {
  maxLength: {
    message: 'Поле не должно содержать более 30 символов',
    value: 30,
  },
  pattern: {
    value: /^[\A-Za-zА-Яа-яЁё\u00C0-\u017F\s\'\-]+$/i,
    message:
      'Введите корректное значение (буквы, \u00C0 - \u017F, "-", " ", "\'")',
  },
}

type Props = {
  // isLoading?: boolean
  // errorText?: string
}

const AboutMeForm: FC<Props> = ({}) => {
  const [phone, setPhone] = useState<string>()
  const [formChanged, setFormChanged] = useState(false)

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
    watch,
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<UserPatchData>({
    mode: 'all',
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
    if (!data) return

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
    setPhone(data.phone) // триггер для изменения телефона

    // подписываемся на изменение формы, чтоб не показывать ошибки сервера после изменения поля
    const { unsubscribe } = watch((_value, { name }) => {
      name === 'phone' && setFormChanged(true)
    })

    return () => unsubscribe()
  }, [data, getValues, setValue, watch])

  const onSubmit = (dataFromInput: UserPatchData) => {
    if (dataFromInput) {
      const filteredPhone = dataFromInput.phone.replace(/(\D)/g, '')
      patchUserData({
        userName: currentUserData?.username ?? '',
        body: {
          ...dataFromInput,
          phone: filteredPhone.length ? `+${filteredPhone}` : '',
        },
      })
      setFormChanged(false)
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
            <FormInput
              register={register}
              id="display_name"
              autocomplete="display_name"
              options={displayNameOptions}
            />
          </Field>

          <Field
            label="Имя"
            error={errors?.first_name?.message || patchErrorText.first_name}
          >
            <FormInput
              register={register}
              id="first_name"
              autocomplete="first_name"
              placeholder="Иван"
              options={textOptions}
            />
          </Field>

          <Field
            label="Фамилия"
            error={errors?.last_name?.message || patchErrorText.last_name}
          >
            <FormInput
              register={register}
              id="last_name"
              autocomplete="last_name"
              placeholder="Иванов"
              options={textOptions}
            />
          </Field>

          <Field
            label="Телефон"
            error={
              errors?.phone?.message || (!formChanged && patchErrorText.phone)
            }
          >
            <PhoneFormInput
              register={register}
              value={phone}
              setValue={setValue}
              getValues={getValues}
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
            <FormInput
              register={register}
              id="city"
              autocomplete="city"
              placeholder="Москва"
              options={textOptions}
            />
          </Field>

          <Field
            label="О себе"
            error={errors?.bio?.message || patchErrorText.bio}
          >
            <FormInput
              register={register}
              id="bio"
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
