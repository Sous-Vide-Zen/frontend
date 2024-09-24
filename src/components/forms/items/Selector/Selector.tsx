import { FC, HTMLInputTypeAttribute } from 'react'
import { UseFormRegister } from 'react-hook-form'
import Select from 'react-select'

import { COUNTRIES } from '@/helpers/countries'

interface InputProps {
  placeholder?: string
  type?: HTMLInputTypeAttribute
  name: string
  className?: string
  register: UseFormRegister<any>
  autoComplete?: string
}

export const Selector: FC<InputProps> = ({
  placeholder,
  type = 'text',
  name,
  className,
  register,
  ...rest
}) => {
  return (
    <div className={className}>
      <Select
        options={COUNTRIES}
        placeholder="Россия"
        inputId={Date.now().toString()}
        {...rest}
      />
    </div>
  )
}
