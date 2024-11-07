'use client'
import { FC } from 'react'
import { IRecipeWithIngredients } from '@/store/features/recipes/recipes.types'
import styles from './ingredientsShowEndAdd.module.scss'

interface RecipeCardProps {
  change: boolean
  recipe: IRecipeWithIngredients
  // readonly?: boolean
  // onClose?: () => void
  // slug: string
  // pub_date: string
}

const ingredientsShowEndAdd: FC<RecipeCardProps> = ({ change, recipe }) => {
  return (
    <div className={styles.component_container}>
      {/* <div className={styles.cockingTime_container}>
        <p className={styles.cockingTime}>Время приготовления</p>
        <div className={styles.hourPlusMinutes}>
          {!change && (
            <div className={`${styles.minutes} ${styles.fromInput}`}>
              {recipe.cooking_time}
              минут
            </div>
          )}

          <div className={styles.minutes}>
                                <Input
                                    register={register}
                                    name="cooking_time"
                                    type="text"
                                    placeholder="минуты"
                                // options={{
                                //     maxLength: {
                                //         message: "Поле не должно содержать более 30 символов",
                                //         value: 30,
                                //     }
                                // }}
                                // error={errors?.display_name?.message}
                                />
                            </div>
        </div>
      </div> */}

      <div className={styles.ingredients_container}>
        {/* <p className={styles.ingredients}>Ингредиенты</p> */}
        <div className={styles.inner_descriptionIngredients}>
          <div>
            <div className={`${styles.name} ${styles.columnName}`}>
              Название
            </div>
            <div>
              {recipe.ingredients.map((ingredient: any, index: any) => (
                <>
                  <p
                    className={`${styles.name} ${styles.fromInput}`}
                    key={index}
                  >
                    {ingredient.name}
                  </p>
                  {recipe.ingredients.length - 1 > index && (
                    <div className={styles.line}></div>
                  )}
                </>
              ))}
            </div>
          </div>
          <div>
            <div className={`${styles.unit} ${styles.columnName}`}>
              Количество
            </div>
            <div>
              {recipe.ingredients.map((ingredient: any, index: any) => (
                <>
                  <p
                    className={`${styles.unit} ${styles.fromInput}`}
                    key={index}
                  >
                    {ingredient.amount}
                  </p>
                  {recipe.ingredients.length - 1 > index && (
                    <div className={styles.line}></div>
                  )}
                </>
              ))}
            </div>
          </div>
          <div>
            <div className={`${styles.amount} ${styles.columnName}`}>
              Единица измерения
            </div>
            <div>
              {recipe.ingredients.map((ingredient: any, index: any) => (
                <>
                  <p
                    className={`${styles.amount} ${styles.fromInput}`}
                    key={index}
                  >
                    {ingredient.unit}
                  </p>
                  {recipe.ingredients.length - 1 > index && (
                    <div className={styles.lineAmount}></div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ingredientsShowEndAdd
