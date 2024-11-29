'use client'

import { ChangeEvent, FC, FormEvent } from 'react'
import styles from './DatePicker.module.scss'

interface InputProps {
  value?: Date
  placeholder?: string
  onChange?: (arg?: Date) => void
}

/* 
  todo: сделать в соответствии с дизайном

  можно попробавть использовать готовый компонент, например из:
  https://medevel.com/22-date-picker-and-calendar-libraries-for-react/
  input + day-picker: https://react-day-picker.js.org/advanced-guides/input-fields
  https://github.com/arqex/react-datetime

*/
export const DatePicker: FC<InputProps> = ({
  value,
  placeholder,
  onChange,
}) => {
  //todo: попытка реализации текстовой надписи. Но надо переделать на нативный placeholder чтоб не было ошибки с смене неуправляемого режима на упраляемый
  const handleOnFocus = (event: FormEvent<HTMLInputElement>) => {
    event.currentTarget.type = 'date'
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange && onChange(new Date(e.target.value))

  return (
    <div className={styles.datePicker}>
      <input
        type={value ? 'date' : 'text'}
        value={value?.toISOString().split('T')[0]}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onChange={handleChange}
      />
    </div>
  )
}
