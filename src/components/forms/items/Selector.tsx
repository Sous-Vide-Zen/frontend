import { FC, HTMLInputTypeAttribute } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import Select from 'react-select'

import { COUNTRIES } from '@/helpers/countries'

interface InputProps {
  placeholder?: string
  type?: HTMLInputTypeAttribute
  name: string
  value: string
  setValue: UseFormSetValue<any>
  className?: string
  register: UseFormRegister<any>
  autoComplete?: string
}

export const Selector: FC<InputProps> = ({
  placeholder,
  type = 'text',
  name,
  value,
  setValue,
  className,
  register,
  ...rest
}) => {
  return (
    <div className={className}>
      <Select
        options={COUNTRIES}
        // placeholder="Россия"
        // inputId={Date.now().toString()}
        // value={value}
        // //@ts-error
        // onChange={(selectedOption: { value: string; label: string })=>setValue(name, v?.value)}

        // {...rest}
      />
    </div>
  )
}
