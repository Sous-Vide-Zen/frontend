import { ChangeEvent, FC, useCallback, useEffect } from 'react'
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'

import styles from '../forms.module.scss'

interface InputProps {
  name: string
  value?: string // нужно для первоначального форматирования номера
  setValue?: UseFormSetValue<any>
  register: UseFormRegister<any>
  getValues: UseFormGetValues<any>
  autoComplete?: string
}

export const PhoneFormInput: FC<InputProps> = ({
  name,
  value,
  setValue,
  register,
  getValues,
  ...rest
}) => {
  const optionsForm = { ...register(name) }

  const setNewCardValue = useCallback(
    (currentValue: string) => {
      if (!currentValue) return

      const cardValue = currentValue
        .replace(/\D/g, '')
        .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/) ?? ['', '', '', '', '']

      const newCardValue = !(cardValue[2] ?? '')
        ? cardValue[1]
        : `+${cardValue[1]} (${cardValue[2]}) ${`${
            cardValue[3] ? `-${cardValue[3]}` : ''
          }`}${`${cardValue[4] ? `-${cardValue[4]}` : ''}`}`
      setValue && setValue(name, newCardValue, { shouldValidate: true })
    },
    [name, setValue],
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setNewCardValue(val)
    const numbers = '+'.concat(val.replace(/(\D)/g, ''))
  }

  useEffect(() => {
    value && setNewCardValue(value)
  }, [setNewCardValue, value])

  return (
    <input
      className={styles.input}
      type="tel"
      inputMode="numeric"
      placeholder="+7 (841) "
      {...optionsForm}
      {...register(name, {
        // pattern: {
        //   value: /^\+{1}[\d\-\ \(\)]/,
        //   message: 'Введите корректный телефон +7 (841) -...-....',
        // },
        minLength: {
          value: 0,
          message: 'слишком короткий номер',
        },
      })}
      onChange={handleChange}
      {...rest}
    />
  )
}
