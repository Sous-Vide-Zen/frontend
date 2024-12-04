'use client'
import { FC, Fragment } from 'react'
import { RecipeFull } from '@/store/features/recipes/recipes.types'
import styles from './ingredientsShowEndAdd.module.scss'

interface RecipeCardProps {
  ingredients?: RecipeFull['ingredients']
  readOnly: boolean
  // onClose?: () => void
  // slug: string
  // pub_date: string
}

const ingredientsShowEndAdd: FC<RecipeCardProps> = ({ readOnly, ingredients }) => {
  return (
    <div className={styles.component_container}>
      {/* <div className={styles.cockingTime_container}>
        <p className={styles.cockingTime}>Время приготовления</p>
        <div className={styles.hourPlusMinutes}>
          {!readonly && (
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
              {ingredients?.map((ingredient: any, index: any) => (
                <Fragment key={index}>
                  <p className={`${styles.name} ${styles.fromInput}`}>
                    {ingredient.name}
                  </p>
                  {ingredients?.length - 1 > index && (
                    <div className={styles.line}></div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
          <div>
            <div className={`${styles.unit} ${styles.columnName}`}>
              Количество
            </div>
            <div>
              {ingredients?.map((ingredient: any, index: any) => (
                <Fragment key={index}>
                  <p className={`${styles.unit} ${styles.fromInput}`}>
                    {ingredient.amount}
                  </p>
                  {ingredients.length - 1 > index && (
                    <div className={styles.line}></div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
          <div>
            <div className={`${styles.amount} ${styles.columnName}`}>
              Единица измерения
            </div>
            <div>
              {ingredients?.map((ingredient: any, index: any) => (
                <Fragment key={index}>
                  <p className={`${styles.amount} ${styles.fromInput}`}>
                    {ingredient.unit}
                  </p>
                  {ingredients.length - 1 > index && (
                    <div className={styles.lineAmount}></div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ingredientsShowEndAdd
