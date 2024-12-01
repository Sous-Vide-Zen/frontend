import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import Image from 'next/image'
import Select from 'react-select'

import styles from '../mutationRecipe.module.scss'
import { stylesFromTag } from './addNewRecipeTagSelectStyles'
import { stylesFromCategory } from './addNewRecipeCategorySelectStyles'
import { Button } from '@/components/ui/'
import { FormInput } from '@/components/forms/items'
import IngredientsShowEndAdd from '@/components/ui/RecipeModify/IngredientsShowEndAdd/ingredientsShowEndAdd'
import hoursToMinutes from '@/helpers/hoursOrMinutes'
import { RecipeFull } from '@/store/features/recipes/recipes.types'

type Props = {
  recipe: RecipeFull
  notShowProps: boolean
}

const RecipeBody: FC<Props> = ({ recipe, notShowProps }) => {
  const router = useRouter()
  const [showMediaIcons, setShowMediaIcons] = useState<boolean>(false)
  const [notShow, setNotShow] = useState(false)
  useEffect(() => {
    setNotShow(notShowProps)
  }, [notShowProps])
  // console.log(recipe)
  /* тестовые данные для селекта*/

  const tagOptions: { value: string; label: string }[] = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  /* */
  const defaultTag =
    recipe?.tag.length > 0
      ? recipe.tag.map((c: { name: string }) => ({
          label: c.name,
        }))
      : []

  /* RHF data */
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    control,
  } = useForm({
    defaultValues: {
      hours: hoursToMinutes(Math.floor(recipe?.cooking_time / 60) || 0, [
        'час',
        'часа',
        'часов',
      ]),
      cooking_time: hoursToMinutes(recipe?.cooking_time % 60 || 0, [
        'минута',
        'минуты',
        'минут',
      ]),
      full_text: recipe?.full_text || '',
      category:
        recipe?.category.map((c: { name: string }) => ({
          label: c.name,
        })) || [],
      tag: defaultTag,
    },
    mode: 'onBlur',
  })
  const onSubmit = (dataFromInput: any) => {
    console.log(dataFromInput)
  }
  let displayNoneClass =
    recipe?.cooking_time < 60 ? styles.displayNone : styles.background4
  /* */
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <div className={styles.button_container}>
      <Button
        onClick={(e) => e.preventDefault()}
        size={'medium'}
        color={'secondary'}
        style={{ width: '100%', marginBottom: '24px' }}
      >
        Добавить фото для превью +
      </Button>
    </div> */}
        <input
          className={styles.standardInput}
          placeholder={'Название рецепта*'}
          defaultValue={recipe?.title}
        />
        <div className={styles.cockingTime_container}>
          <p className={styles.cockingTime}>Время приготовления*</p>
          <div className={styles.hourPlusMinutes}>
            <div className={`${styles.hours} ${displayNoneClass}`}>
              <FormInput
                register={register}
                id="hours"
                type="text"
                placeholder="часы"
                disabled={notShow}
                // options={{
                //     maxLength: {
                //         message: "Поле не должно содержать более 30 символов",
                //         value: 30,
                //     }
                // }}
                // error={errors?.display_name?.message}
              />
            </div>
            <div className={styles.minutes}>
              <FormInput
                register={register}
                id="cooking_time"
                type="text"
                placeholder="минуты"
                disabled={notShow}
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
        </div>
        <div className={styles.ingredients_container}>
          <p className={styles.ingredients}>Ингредиенты*</p>
          <div className={styles.inner_descriptionIngredients}>
            {notShow && (
              <IngredientsShowEndAdd change={false} recipe={recipe} />
            )}
            {!notShow && (
              <>
                <div className={styles.name}>
                  <FormInput
                    register={register}
                    id="name"
                    type="text"
                    placeholder="название"
                    // options={{
                    //     maxLength: {
                    //         message: "Поле не должно содержать более 30 символов",
                    //         value: 30,
                    //     }
                    // }}
                    // error={errors?.display_name?.message}
                  />
                </div>
                <div className={styles.unit}>
                  <FormInput
                    register={register}
                    id="unit"
                    type="text"
                    placeholder="количество"
                    // options={{
                    //     maxLength: {
                    //         message: "Поле не должно содержать более 30 символов",
                    //         value: 30,
                    //     }
                    // }}
                    // error={errors?.display_name?.message}
                  />
                </div>
                <div className={styles.amount}>
                  <FormInput
                    register={register}
                    id="amount"
                    type="text"
                    placeholder="кг"
                    // options={{
                    //     maxLength: {
                    //         message: "Поле не должно содержать более 30 символов",
                    //         value: 30,
                    //     }
                    // }}
                    // error={errors?.display_name?.message}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        {!notShow && (
          <button
            onClick={(e) => e.preventDefault()}
            className={styles.ingredientsButton}
          >
            +
          </button>
        )}

        <div className={styles.cocking_container}>
          <p className={styles.cocking}>Приготовление*</p>
          <div className={styles.full_text}>
            {notShow && <p className={styles.textArea}>{recipe.full_text}</p>}
            {!notShow && (
              <>
                <FormInput
                  className={styles.textArea}
                  register={register}
                  id="full_text"
                  type="textarea"
                  placeholder="впишите сюда текст рецепта"
                  disabled={notShow}
                  // options={{
                  //     maxLength: {
                  //         message: "Поле не должно содержать более 30 символов",
                  //         value: 30,
                  //     }
                  // }}
                  // error={errors?.display_name?.message}
                />
                {/* <textarea className={styles.textArea} /> */}

                <button
                  onClick={(e) => {
                    e.preventDefault(), setShowMediaIcons(!showMediaIcons)
                  }}
                  className={styles.cockingButton}
                >
                  +
                </button>
              </>
            )}
            {showMediaIcons && (
              <div className={styles.mediaIcons}>
                <Image
                  alt="add-image"
                  src={'./img/add-new-recipe/add_photo.svg'}
                  width={24}
                  height={24}
                />
                <Image
                  alt="add-image"
                  src={'./img/add-new-recipe/add_video.svg'}
                  width={24}
                  height={24}
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles.category_container}>
          <p className={styles.category}>Категории</p>
          <div className={styles.category_input}>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  {...field}
                  options={tagOptions}
                  isDisabled={notShow}
                  isMulti
                  placeholder={notShow ? '' : 'Выберите категорию'}
                  styles={stylesFromCategory}
                  inputId={Date.now().toString()}
                />
              )}
            />
            {/* <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <CreatableSelect
              {...field}
              styles={stylesFromCategory}
              placeholder="Выберите категорию"
              formatCreateLabel={(value) => (
                <span>{`Создать "${value}"`}</span>
              )}
              isClearable
              options={options}
            />
          )}
        /> */}
          </div>
        </div>
        <div className={styles.tag_container}>
          <p className={styles.tag}>Хэштеги</p>
          <div className={styles.tag_input}>
            <Controller
              control={control}
              name="tag"
              disabled={notShow}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={tagOptions}
                  isDisabled={notShow}
                  placeholder={null}
                  styles={stylesFromTag}
                  inputId={Date.now().toString()}
                />
              )}
            />
          </div>
        </div>
        {!notShow && (
          <div>
            <p className={styles.required}>
              *обозначены обязательные для заполнения поля
            </p>
            <Button
              className={styles.buttonOnsubmit}
              size={'medium'}
              color={'primary'}
            >
              Опубликовать
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}

export default RecipeBody
