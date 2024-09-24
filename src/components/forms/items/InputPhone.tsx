import { FC, useRef, useState } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

import styles from '../forms.module.scss'

interface InputProps {
  name: string
  setValue: UseFormSetValue<any>
  register: UseFormRegister<any>
  autoComplete?: string
}

export const InputPhone: FC<InputProps> = ({
  name,
  setValue,
  register,
  ...rest
}) => {
  const [card, setCard] = useState<string>()
  const inputCard = useRef<HTMLInputElement>(null)

  const handleChange = () => {
    if (!inputCard.current) return

    const cardValue = inputCard.current.value
      .replace(/\D/g, '')
      .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/) ?? ['', '', '', '', '']

    inputCard.current.value = !(cardValue[2] ?? '')
      ? cardValue[1]
      : `+${cardValue[1]} (${cardValue[2]}) ${`${
          cardValue[3] ? `-${cardValue[3]}` : ''
        }`}${`${cardValue[4] ? `-${cardValue[4]}` : ''}`}`
    const numbers = inputCard.current.value.replace(/(\D)/g, '')

    setCard(numbers)
    setValue(name, numbers)
  }

  return (
    <input
      type="tel"
      inputMode="numeric"
      placeholder="+7 (841) "
      {...register(name, {
        pattern: {
          value: /^[0-9]/i,
          message: 'Введите корректный телефон',
        },
        minLength: {
          value: 10,
          message: 'Минимум 10 цифр',
        },
      })}
      // autoComplete={autocomplete}
      className={styles.input}
      ref={inputCard}
      onChange={handleChange}
      {...rest}
    />
  )
}
