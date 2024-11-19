'use client'
import { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { FormInput } from '@/components/forms/items'

type Props = {
  register: UseFormRegister<any>
  id: string
}

export const EmailFormInput: FC<Props> = ({ register, id }) => {
  return (
    <FormInput
      register={register}
      id={id}
      type="email"
      autocomplete="email"
      placeholder="ivanov@gmail.com"
      options={{
        required: 'Обязательное поле',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
          message: 'Введите корректный ящик',
        },
      }}
    />
  )
}
