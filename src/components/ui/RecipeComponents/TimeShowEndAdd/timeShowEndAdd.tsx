'use client'
import { FC, useState, useEffect } from 'react'
import styles from './timeShowEndAdd.module.scss'
// import { register } from 'module'
import { Controller, useForm } from 'react-hook-form'
// import { Input } from 'react-select/animated';
import Input from '@/components/ui/Input/Input'

interface RecipeCardProps {
  change: boolean
  cooking_time: number
  // control: any
  setRegister2: (value: any) => void
}

const timeShowEndAdd: FC<RecipeCardProps> = ({
  change,
  cooking_time,
  setRegister2,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { register } = useForm()
  // props.setRegister2(register);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   setRegister2() // Set register when the component mounts
  // }, [register, setRegister2])
  // console.log(register)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setRegister2(value)
  }

  return (
    <div className={styles.component_container}>
      <div className={styles.cockingTime_container}>
        <p className={styles.cockingTime}>Время приготовления</p>
        <div className={styles.hourPlusMinutes}>
          {!change && (
            <div className={`${styles.minutes} ${styles.fromInput}`}>
              {cooking_time}
              минут
            </div>
          )}
          {change && (
            <form>
              <div className={styles.minutes}>
                <Input
                  register={register}
                  name="cooking_time"
                  type="text"
                  placeholder="минуты"
                  onChange={handleChange}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
export default timeShowEndAdd
