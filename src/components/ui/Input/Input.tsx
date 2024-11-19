import Image from 'next/image'
import { FC, HTMLInputTypeAttribute, useState } from 'react'
import { RefCallBack, RegisterOptions } from 'react-hook-form'
import cn from 'clsx'

import styles from './Input.module.scss'

export interface InputProps {
  refX?: RefCallBack
  disabled?: boolean
  placeholder?: string
  type?: HTMLInputTypeAttribute
  className?: string
  // error?: any
  // touchedFields?: Partial<
  //   Readonly<{
  //     [x: string]: any
  //   }>
  // >
  options?: RegisterOptions<any>
  autocomplete?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = ({
  refX,
  disabled = false,
  placeholder,
  // error,
  type = 'text',
  className,
  // touchedFields,
  options,
  autocomplete,
  ...rest
}) => {
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
          {...rest}
          ref={refX}
          autoComplete={autocomplete}
          className={cn(styles.input, {
            // [styles.borderError]: error !== undefined,
          })}
        />
        {isPassword && (
          <div className={styles.input__icons}>
            <button
              className={styles.input__eye}
              type="button"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseOut={handleMouseUp}
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
      {/* {error && <span className={styles.error}>{error}</span>} */}
    </div>
  )
}

export default Input
