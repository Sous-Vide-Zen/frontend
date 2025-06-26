'use client'
import { FC, useEffect } from 'react'
import { RecipeFormInputs } from '@/store/features/recipes/recipes.types'
import styles from './cookingTime.module.scss'
import { Field, FormInput } from '@/components/forms/items'
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
  Control,
} from 'react-hook-form'

interface Props {
  readOnly: boolean
  control: Control<RecipeFormInputs>
  getValues: UseFormGetValues<RecipeFormInputs>
  register: UseFormRegister<RecipeFormInputs>
  setValue: UseFormSetValue<RecipeFormInputs>
  errors: FieldErrors<RecipeFormInputs>
}

export const CookingTime: FC<Props> = ({
  readOnly,
  control,
  getValues,
  register,
  setValue,
  errors,
}) => {
  const hours = useWatch({
    control,
    name: 'hours',
    defaultValue: getValues('hours') || '0',
  })

  const cookingTime = useWatch({
    control,
    name: 'minutes',
    defaultValue: getValues('minutes') || '10',
  })

  useEffect(() => {
    const hoursValue = parseInt(hours, 10) || 0
    const minutesValue = parseInt(cookingTime, 10) || 0

    const totalCookingTime = hoursValue * 60 + minutesValue
    // Сохраняем в cooking_time, только если totalCookingTime изменилось
    if (
      String(hoursValue) !== getValues('hours') ||
      String(minutesValue) !== getValues('minutes')
    ) {
      setValue('cooking_time', String(totalCookingTime))
    }
  }, [hours, cookingTime, setValue, getValues])

  const displayNoneClass =
    Number(getValues('cooking_time')) < 60
      ? readOnly
        ? styles.displayNone
        : styles.background4
      : styles.background4

  return (
    <div className={styles.hourPlusMinutes}>
      <div className={`${styles.hours} ${displayNoneClass}`}>
        <Field error={errors?.hours?.message || null}>
          <FormInput
            register={register}
            id="hours"
            type="text"
            placeholder="часы"
            disabled={readOnly}
            options={{
              validate: (value) => {
                if (!value) return true
                const number = parseInt(value)
                if (number === 0) {
                  return true
                }
                if (isNaN(number)) {
                  return 'Введите корректное число часов'
                }
                if (number < 0) {
                  return 'Время не должно быть меньше 0 часов'
                }
                if (number > 24) {
                  return 'Время не должно быть больше 24 часов'
                }
                return true
              },
            }}
          />
        </Field>
      </div>
      <div className={styles.minutes}>
        <Field error={errors?.minutes?.message || null}>
          <FormInput
            register={register}
            id="minutes"
            type="text"
            placeholder="минуты"
            disabled={readOnly}
            options={{
              validate: (value) => {
                const hoursValue = parseInt(hours, 10) || 0
                const text = value
                if (text.trim() === '' && !hoursValue) {
                  return 'Поле обязательно для заполнения'
                }
                const minutes = parseInt(value, 10)
                if (isNaN(minutes) && !hoursValue) {
                  return 'Введите корректное число минут'
                }
                if (minutes <= 9 && !hoursValue) {
                  return 'Время не должно быть меньше 10 минут'
                }
                if (minutes + hoursValue * 60 > 1440) {
                  return 'Время не должно быть больше 1440 минут'
                }
                return true
              },
            }}
          />
        </Field>
      </div>
    </div>
  )
}
