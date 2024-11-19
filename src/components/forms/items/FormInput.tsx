'use client'
import { ComponentProps, FC } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import { Input } from '@/components/ui'

type Props = {
  id: string
  register: UseFormRegister<any>
  options?: RegisterOptions<any>
} & ComponentProps<typeof Input>

export const FormInput: FC<Props> = ({ id, options, register, ...props }) => {
  const { ref: refX, ...optionsForm } = options
    ? { ...register(id, options) }
    : { ...register(id) }

  return <Input {...props} {...optionsForm} refX={refX} />
}
