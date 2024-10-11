import Image from 'next/image'
import { FC, HTMLInputTypeAttribute, useState } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import cn from 'clsx'

import styles from './Input.module.scss'

interface InputProps {
  disabled?: boolean
  placeholder?: string
  type?: HTMLInputTypeAttribute
  name: string
  className?: string
  error?: any
  touchedFields?: Partial<
    Readonly<{
      [x: string]: any
    }>
  >
  options?: RegisterOptions<any>
  register: UseFormRegister<any>
  autocomplete?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({
  disabled = false,
  placeholder,
  error,
  type = 'text',
  name,
  className,
  touchedFields,
  register,
  options,
  autocomplete,
  ...rest
}) => {
  // console.log("error", error, "touchedFields", touchedFields)
  const optionsForm = options
    ? { ...register(name, options) }
    : { ...register(name) }

  const isPassword = type === 'password'

  const [typeInput, setTypeInput] = useState(type)
  const handleMouseDown = () => {
    setTypeInput('text')
  }

  const handleMouseUp = () => {
    setTypeInput(type)
  }

  return (
    <div className={className}>
      <div className={styles.input__wrapper}>
        <input
          placeholder={placeholder}
          disabled={disabled}
          type={isPassword ? typeInput : type}
          {...optionsForm}
          {...rest}
          autoComplete={autocomplete}
          className={cn(styles.input, {
            [styles.borderError]: error !== undefined,
          })}
        />
        {isPassword && (
          <div className={styles.input__icons}>
            <button
              className={styles.input__eye}
              type="button"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            >
              <Image
                alt="eye"
                src={'/img/eye.svg'}
                width={24}
                height={24}
                draggable={false}
              />
            </button>
          </div>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}

export default Input
