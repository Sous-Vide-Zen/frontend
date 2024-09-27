import { FC, useEffect, useRef, useState } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

import styles from '../forms.module.scss'

interface InputProps {
  name: string
  value: string
  setValue: UseFormSetValue<any>
  register: UseFormRegister<any>
  autoComplete?: string
}

export const InputPhone: FC<InputProps> = ({
  name,
  value,
  setValue,
  register,
  ...rest
}) => {
  const [card, setCard] = useState<string>()
  const inputCard = useRef<HTMLInputElement>(null)

  const setNewCardValue = (currentValue: string) => {
    if (!currentValue) return

    const cardValue = currentValue
      .replace(/\D/g, '')
      .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/) ?? ['', '', '', '', '']

    const newCardValue = !(cardValue[2] ?? '')
      ? cardValue[1]
      : `+${cardValue[1]} (${cardValue[2]}) ${`${
          cardValue[3] ? `-${cardValue[3]}` : ''
        }`}${`${cardValue[4] ? `-${cardValue[4]}` : ''}`}`
    setCard(newCardValue)
  }

  const handleChange = () => {
    if (!inputCard.current) return

    setNewCardValue(inputCard.current.value)
    const numbers = inputCard.current.value.replace(/(\D)/g, '')

    setValue(name, numbers, { shouldValidate: true })
  }

  useEffect(() => {
    setNewCardValue(value)
  }, [value])

  return (
    <input
      className={styles.input}
      type="tel"
      inputMode="numeric"
      placeholder="+7 (841) "
      {...register(name, {
        pattern: {
          value: /^[0-9]/i,
          message: 'Введите корректный телефон',
        },
        required: 'Обязательное поле',
        minLength: {
          value: 11,
          message: 'Минимум 11 цифр',
        },
      })}
      ref={inputCard}
      defaultValue={card}
      onChange={handleChange}
      {...rest}
    />
  )
}
