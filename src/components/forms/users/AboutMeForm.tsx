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
import Layout from '@/components/layout/layout'

/*
 с телефоном пришлось "изобретать велосипед" с допонительнми полями {setValue, getValues},
 т.к. не получилось получить доступ к register.ref и отследить его изменение
*/

const displayNameOptions: RegisterOptions<any> = {
  maxLength: {
    message: 'Поле не должно содержать более 150 символов',
    value: 150,
  },
  pattern: {
    value: /^[\p{L}\d\s+\-*=@!#\$%\^&\(\)_,.]+$/u,
    message: 'Введите корректное значение (буквы, цифры, "!@#$%^&*()_-+=,.")',
  },
}

const textOptions: RegisterOptions<any> = {
  maxLength: {
    message: 'Поле не должно содержать более 30 символов',
    value: 30,
  },
  pattern: {
    value: /^[\A-Za-zА-Яа-яЁё\ \-]+$/i,
    message: 'Введите корректное значение (буквы, "-", " ")',
  },
}

const AboutMeForm: FC = ({}) => {
  const [phone, setPhone] = useState<string>()
  const [formChanged, setFormChanged] = useState(false)
  const [avatar, setAvatar] = useState<string | null>(null)

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

  const [selectedCountryColor, setSelectedCountryColor] = useState('white') // Начальный цвет

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
    for (const u in userData) {
      //@ts-ignore
      setValue(u, data[u])
    }
    setPhone(data.phone) // триггер для изменения телефона
    avatar && setAvatar(avatar)
    // подписываемся на изменение формы, чтоб не показывать ошибки сервера после изменения поля
    const { unsubscribe } = watch((_value, { name }) => {
      name === 'phone' && setFormChanged(true)
    })

    return () => unsubscribe()
  }, [data, getValues, setValue, watch])

  const onSubmit = (dataFromInput: UserPatchData) => {
    if (dataFromInput) {
      const filteredPhone = dataFromInput.phone
        ? dataFromInput.phone.replace(/(\D)/g, '')
        : ''
      patchUserData({
        userName: currentUserData?.username ?? '',
        body: {
          ...dataFromInput,
          phone: filteredPhone.length ? `+${filteredPhone}` : '',
          country: dataFromInput.country ?? '',
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
    <Layout
      sidebar={false}
      backButton={false}
      disablebackButtonFormForms={true}
      hideHeader={true}
    >
      <div
        className={cn(formStyles.container, { [styles.condensedForm]: true })}
      >
        <form onSubmit={onSubmit && handleSubmit(onSubmit)}>
          <FieldSet label="Расскажите о себе">
            <Field
              label="Никнейм"
              error={
                errors?.display_name?.message || patchErrorText.display_name
              }
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
                    options={COUNTRIES.filter((c) => c.value !== value)} // Убираем выбранную страну
                    placeholder="Россия"
                    isClearable={true}
                    inputId={Date.now().toString()}
                    value={COUNTRIES.find((c) => c.value === value)}
                    onChange={(selectedOption) => {
                      onChange(selectedOption?.value)
                      setSelectedCountryColor('white')
                    }}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: '12px',
                        borderColor: state.isFocused
                          ? 'var(--base-color-dark)'
                          : baseStyles.borderColor,
                        backgroundColor: selectedCountryColor,
                        '&:hover': {
                          borderColor: state.isFocused
                            ? 'var(--base-color-dark)'
                            : baseStyles.borderColor,
                        },
                        outline: 'none',
                        boxShadow: 'none',
                      }),
                      menu: (base) => ({
                        ...base,
                        border: '1px solid var(--input-advices)', // Устанавливаем зеленую рамку для выпадающего списка
                        zIndex: '100', // Отображение меню поверх других элементов
                        overflow: 'hidden', // Препятствует выходу содержимого за рамки
                        marginTop: '3px', // Отступ между контролом и меню
                        borderRadius: '12px',
                        '&:hover': {
                          backgroundColor: 'white',
                          borderRadius: '12px',
                        },
                      }),
                      option: (base, state) => ({
                        ...base,
                        transition: 'background-color 0.2s ease-out',
                        backgroundColor: state.isFocused
                          ? 'var(--input-advices)' // Цвет фона при фокусе
                          : state.isSelected
                            ? 'var(--input-advices)' // Цвет фона для выбранного элемента
                            : base.backgroundColor, // Цвет фона по умолчанию
                        color:
                          state.isFocused || state.isSelected
                            ? 'var(--base-color-dark)'
                            : base.color,
                        '&:hover': {
                          backgroundColor: 'var(--input-advices)', // Цвет фона при наведении
                          color: 'white', // Цвет текста при наведении
                        },
                      }),
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
              <div className={styles.textAreaContainer}>
                <textarea
                  {...register('bio')}
                  className={styles.textArea}
                  id="bio"
                  placeholder="Расскажите немного о себе"
                  // title="Поле не должно содержать более 200 символов"
                  maxLength={200}
                />
              </div>
            </Field>

            <AvatarImage avatar={avatar} />
          </FieldSet>

          <Button
            disabled={!isValid || !formChanged}
            type="submit"
            color="primary"
            size="medium"
            loading={isPatchLoading}
            style={{ borderRadius: '18px' }}
          >
            Сохранить
          </Button>

          <LinkLikeButton href="/" size="medium" color="secondary">
            Заполнить позже
          </LinkLikeButton>
        </form>
      </div>
    </Layout>
  )
}

export default AboutMeForm
