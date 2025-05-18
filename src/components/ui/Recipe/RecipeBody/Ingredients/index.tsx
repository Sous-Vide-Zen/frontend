'use client'
import { FC, useCallback, useEffect } from 'react'
import {
  Ingredient,
  RecipeFormInputs,
} from '@/store/features/recipes/recipes.types'
import styles from './ingredients.module.scss'
import { Field, FormInput } from '@/components/forms/items'
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
  Control,
} from 'react-hook-form'
import IngredientsShowEndAdd from '../IngredientsShowEndAdd'

const textForIngredient = {
  validate: (value: string) => {
    const text = value
    if (text.trim() === '') {
      return 'Поле обязательно для заполнения'
    }
    if (text.length > 30) {
      return 'Поле не должно содержать более 30 символов'
    }
    return true
  },
}

interface Props {
  readOnly: boolean
  control: Control<RecipeFormInputs>
  getValues: UseFormGetValues<RecipeFormInputs>
  register: UseFormRegister<RecipeFormInputs>
  setValue: UseFormSetValue<RecipeFormInputs>
  errors: FieldErrors<RecipeFormInputs>
}

export const Ingredients: FC<Props> = ({
  readOnly,
  control,
  getValues,
  register,
  setValue,
  errors,
}) => {
  const ingredients = useWatch({
    control,
    name: 'ingredients',
    defaultValue: getValues('ingredients'),
  })

  // Инициализация ингредиентов при загрузке
  useEffect(() => {
    const currentIngredients = getValues('ingredients')
    if (!currentIngredients || currentIngredients.length === 0) {
      setValue('ingredients', [{ name: '', amount: 1, unit: '' }])
    }
  }, [getValues, setValue])

  // Добавление нового ингредиента
  const addIngredientField = useCallback(() => {
    const newIngredient: Ingredient = { name: '', amount: 1, unit: '' }
    const updatedIngredients: Ingredient[] = [
      ...(ingredients || []),
      newIngredient,
    ]
    setValue('ingredients', updatedIngredients)
    // console.log('add getValue', updatedIngredients, getValues('ingredients'))
  }, [setValue, ingredients])

  // Удаление ингредиента
  const removeIngredientField = useCallback(
    (indexToRemove: number, e: { stopPropagation: () => void }) => {
      e.stopPropagation()
      const updatedIngredients = (ingredients || []).filter(
        (_, index) => index !== indexToRemove,
      )
      setValue('ingredients', updatedIngredients)
    },
    [setValue, ingredients],
  )

  if (readOnly) {
    return (
      <IngredientsShowEndAdd readOnly={readOnly} ingredients={ingredients} />
    )
  }

  return (
    <div className={styles.inner_descriptionIngredients}>
      {ingredients?.map((_ingredient, index) => (
        <div key={index} className={styles.ingredientFields}>
          <div className={styles.name}>
            <p>Название</p>
            <Field error={errors?.ingredients?.[index]?.name?.message || null}>
              <FormInput
                register={register}
                id={`ingredients.${index}.name`}
                type="text"
                options={textForIngredient}
                // placeholder="название"
              />
            </Field>
          </div>
          <div className={styles.amount}>
            <p>Количество</p>
            <Field
              error={errors?.ingredients?.[index]?.amount?.message || null}
            >
              <FormInput
                register={register}
                id={`ingredients.${index}.amount`}
                type="number"
                // defaultValue={
                //   _ingredient.amount === 0 ? '' : _ingredient.amount
                // }
                options={{
                  validate: (value) => {
                    const text = value
                    // if (text === '' || text === null) {
                    //   return 'Поле обязательно для заполнения'
                    // }
                    const number = parseFloat(value)
                    if (isNaN(number)) {
                      return 'Введите корректное число'
                    }
                    if (number < 1) {
                      return 'Количество не должно быть меньше 1'
                    }
                    if (number > 1000) {
                      return 'Количество не должно быть больше 1000'
                    }
                    return true
                  },
                }}
              />
            </Field>
          </div>
          <div className={styles.unit}>
            <p>Единица измерения</p>
            <Field error={errors?.ingredients?.[index]?.unit?.message || null}>
              <FormInput
                register={register}
                id={`ingredients.${index}.unit`}
                type="text"
                options={textForIngredient}
                // placeholder="кг"
              />
            </Field>
          </div>
          {index > 0 && (
            <button
              onClick={(e) => removeIngredientField(index, e)}
              className={`${styles.ingredientsButton} ${styles.ingredientsButton2}`}
              type="button"
            >
              х
            </button>
          )}
        </div>
      ))}
      <div className={styles.ingredientsButtonWrapper}>
        <button
          type="button"
          onClick={addIngredientField}
          className={styles.ingredientsButton}
        >
          +
        </button>
      </div>
    </div>
  )
}
