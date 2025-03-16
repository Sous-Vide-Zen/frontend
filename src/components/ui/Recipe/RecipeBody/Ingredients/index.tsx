'use client'
import { FC, Fragment, useCallback, useEffect } from 'react'
import {
  RecipeFormInputs,
  RecipeFull,
} from '@/store/features/recipes/recipes.types'
import styles from './ingredients.module.scss'
import { Field, FormInput } from '@/components/forms/items'
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form'
import IngredientsShowEndAdd from '../IngredientsShowEndAdd'

const textOptions = {
  required: {
    value: true,
    message: 'Поле обязательно для заполнения',
  },
  maxLength: {
    message: 'Поле не должно содержать более 150 символов',
    value: 150,
  },
}

interface Props {
  readOnly: boolean
  getValues: UseFormGetValues<RecipeFormInputs>
  register: UseFormRegister<RecipeFormInputs>
  setValue: UseFormSetValue<RecipeFormInputs>
  errors: FieldErrors<RecipeFormInputs>
}

export const Ingredients: FC<Props> = ({
  readOnly,
  getValues,
  register,
  setValue,
  errors,
}) => {
  const ingredients = getValues()['ingredients']
  console.log({ ingredients, errors })

  useEffect(() => {
    console.log({ errors })
  }, [errors])

  const addIngredientField = useCallback(() => {
    ingredients.push({
      name: '',
      amount: 0,
      unit: '',
    })
    setValue('ingredients', ingredients)
  }, [ingredients, setValue])

  const removeIngredientField = useCallback(
    (indexToRemove: number) => {
      delete ingredients[indexToRemove]
      setValue('ingredients', ingredients)
    },
    [ingredients, setValue],
  )

  if (readOnly)
    return (
      <IngredientsShowEndAdd readOnly={readOnly} ingredients={ingredients} />
    )

  return (
    <div className={styles.inner_descriptionIngredients}>
      {ingredients.map((_ingredient, index) => (
        <div key={index} className={styles.ingredientFields}>
          <div className={styles.name}>
            <Field
              error={
                errors && errors?.ingredients && errors.ingredients[index]
                  ? errors.ingredients[index]?.name?.message
                  : null
              }
            >
              <FormInput
                register={register}
                id={`ingredients.${index}.name`}
                type="text"
                options={textOptions}
                placeholder="название"
              />
            </Field>
          </div>
          <div className={styles.amount}>
            <Field
              error={
                errors && errors?.ingredients && errors.ingredients[index]
                  ? errors.ingredients[index]?.amount?.message
                  : null
              }
            >
              <FormInput
                register={register}
                id={`ingredients.${index}.amount`}
                type="number"
                placeholder="количество"
                options={{
                  required: {
                    value: true,
                    message: 'Поле обязательно для заполнения',
                  },
                  validate: (value) => {
                    const number = parseInt(value, 10)
                    if (isNaN(number)) {
                      return 'Введите корректное число'
                    }
                    if (number < 1) {
                      return 'Количество не должно быть меньше 1'
                    }
                    return true
                  },
                }}
              />
            </Field>
          </div>
          <div className={styles.unit}>
            <Field
              error={
                errors && errors?.ingredients && errors.ingredients[index]
                  ? errors.ingredients[index]?.unit?.message
                  : null
              }
            >
              <FormInput
                register={register}
                id={`ingredients.${index}.unit`}
                type="text"
                options={textOptions}
                placeholder="кг"
              />
            </Field>
          </div>
          <button
            onClick={(e) => {
              removeIngredientField(index)
            }}
            className={styles.ingredientsButton}
          >
            х
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addIngredientField}
        className={styles.ingredientsButton}
      >
        +
      </button>
    </div>
  )
}
