'use client'
import { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { FormInput } from '@/components/forms/items'

type Props = {
  register: UseFormRegister<any>
  id: string
  autocomplete?: string
}

export const PasswordFormInput: FC<Props> = ({
  register,
  id,
  autocomplete,
}) => {
  return (
    <FormInput
      register={register}
      id={id}
      type="password"
      autocomplete={autocomplete}
      placeholder="*********"
      options={{
        required: 'Обязательное поле',
        minLength: {
          message: 'Минимальная длина 8 символов',
          value: 8,
        },
        validate: {
          number: (value) =>
            /\d/.test(value) || 'Пароль должен содержать хотя бы одну цифру',
          special: (value) =>
            /[*@!#\$%\^&*_]/.test(value) ||
            'Пароль должен содержать хотя бы один специальный символ (!@#$%^&*_)',
          letter: (value) =>
            /[A-ZА-Я]/.test(value) ||
            'Пароль должен содержать хотя бы одну заглавную букву(A-Z, А-Я)',
        },
      }}
    />
  )
}
