'use client'

import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import Image from 'next/image'
import Select from 'react-select'

import styles from './recipeBody.module.scss'
import { stylesFromTag } from './addNewRecipeTagSelectStyles'
import { stylesFromCategory } from './addNewRecipeCategorySelectStyles'
import { Button } from '@/components/ui/'
import { FormInput } from '@/components/forms/items'
import IngredientsShowEndAdd from './IngredientsShowEndAdd'
import hoursToMinutes from '@/helpers/hoursOrMinutes'
import { RecipeFull } from '@/store/features/recipes/recipes.types'
import {
  useCreateRecipeDraftMutation,
  usePublicateMutation,
  useGetRecipeDraftsQuery,
} from '@/store/features/recipes/recipes.actions'

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

type Props = {
  recipe?: RecipeFull
  readOnly: boolean
}

export const RecipeBody: FC<Props> = ({ recipe, readOnly }) => {
  const router = useRouter()
  const [showMediaIcons, setShowMediaIcons] = useState<boolean>(false)
  const [dataRecipe, setDataRecipe] = useState({})

  // const {
  //   data: drafts,
  //   error: draftsError,
  //   isLoading: draftsLoading,
  // } = useGetRecipeDraftsQuery()
  // console.log(drafts)
  // const [getSlug, { data: recipePublic, error: publishError }] =
  //   useCreateRecipeDraftMutation()
  // console.log(getSlug)
  const [publicate, { data: recipePublic, error: publishError }] =
    usePublicateMutation()
  const handleDraftAndPublish = async () => {
    try {
      // const response = await getSlug().unwrap()
      // const slug = response.slug

      await publicate({
        slug: 'user246_chernovik_2',
        data: dataRecipe,
      }).unwrap()

      console.log('Recipe published successfully')
    } catch (error) {
      console.error('Error creating draft or publishing recipe:', error)
    }
  }

  /* тестовые данные для селекта*/

  const tagOptions: { value: string; label: string }[] = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]
  /* */
  const defaultTag =
    recipe?.tag && recipe?.tag?.length > 0
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
      title: recipe?.title || '',
      hours: hoursToMinutes(Math.floor((recipe?.cooking_time ?? 0) / 60) || 0, [
        'час',
        'часа',
        'часов',
      ]),
      cooking_time: readOnly
        ? hoursToMinutes((recipe?.cooking_time ?? 0) % 60 || 0, [
            'минута',
            'минуты',
            'минут',
          ])
        : '',
      full_text: recipe?.full_text || '',
      category: recipe?.category
        ? recipe?.category.map((c: { name: string }) => ({
            label: c.name,<<<<<<< newQueryCheckinAccess
          })) || []
        : [],
      tag: defaultTag,
    },
    mode: 'onBlur',
  })
  const onSubmit = (dataFromInput: any) => {
    const cookingTime = parseInt(dataFromInput.cooking_time, 10)

    const ingredients = [
      {
        name: dataFromInput.name,
        unit: dataFromInput.amount,
        amount: parseInt(dataFromInput.unit, 10),
      },
    ]

    const transformedData = {
      ...dataFromInput,
      cooking_time: cookingTime,
      ingredients,
    }
    setDataRecipe(transformedData)
    // handleDraftAndPublish()
    console.log('function work', transformedData)
  }
  // console.log(dataRecipe)
  let displayNoneClass =
    recipe && recipe?.cooking_time < 60
      ? styles.displayNone
      : styles.background4
  /* */
  return (
    <div>
      <div>
        {/* <Button onClick={handleDraftAndPublish}>Publish Recipe</Button> */}
        {/* {draftsError && <p>Error creating draft: </p>} */}
        {/* {publishError && <p>Error publishing recipe: </p>} */}
        {/* {recipePublic && <p>Recipe published successfully!</p>} */}
        {/* Additional UI components go here */}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="title"
          type="text"
          register={register}
          options={textOptions}
          className={styles.titleInput}
          placeholder="Название рецепта*"
          disabled={readOnly}
        />
        {errors.title && (
          <span className={styles.errorMessage}>{errors.title.message}</span>
        )}
        <div className={styles.cockingTime_container}>
          <p className={styles.cockingTime}>Время приготовления*</p>
          <div className={styles.hourPlusMinutes}>
            {readOnly && (
              <div className={`${styles.hours} ${displayNoneClass}`}>
                <FormInput
                  register={register}
                  id="hours"
                  type="text"
                  placeholder="часы"
                  disabled={readOnly}
                />
              </div>
            )}
            <div className={styles.minutes}>
              <FormInput
                register={register}
                id="cooking_time"
                type="text"
                placeholder="минуты"
                disabled={readOnly}
                options={{
                  required: {
                    value: true,
                    message: 'Поле обязательно для заполнения',
                  },
                  validate: (value) => {
                    const minutes = parseInt(value, 10)
                    if (isNaN(minutes)) {
                      return 'Введите корректное число'
                    }
                    if (minutes <= 10) {
                      return 'Время не должно быть меньше 10 минут'
                    }
                    return true
                  },
                }}
              />
              {errors.cooking_time && (
                <span className={styles.errorMessage}>
                  {errors.cooking_time.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className={styles.ingredients_container}>
          <p className={styles.ingredients}>Ингредиенты*</p>
          <div className={styles.inner_descriptionIngredients}>
            {readOnly && (
              <IngredientsShowEndAdd
                readOnly={readOnly}
                ingredients={recipe?.ingredients}
              />
            )}
            {!readOnly && (
              <>
                <div className={styles.name}>
                  <FormInput
                    register={register}
                    id="name"
                    type="text"
                    placeholder="название"
                  />
                </div>
                <div className={styles.unit}>
                  <FormInput
                    register={register}
                    id="unit"
                    type="text"
                    placeholder="количество"
                  />
                </div>
                <div className={styles.amount}>
                  <FormInput
                    register={register}
                    id="amount"
                    type="text"
                    placeholder="кг"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        {!readOnly && (
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
            {readOnly && <p className={styles.textArea}>{recipe?.full_text}</p>}
            {!readOnly && (
              <>
                <FormInput
                  className={styles.textArea}
                  register={register}
                  id="full_text"
                  type="textarea"
                  placeholder="впишите сюда текст рецепта"
                  disabled={readOnly}
                  options={{
                    required: {
                      value: true,
                      message: 'Поле обязательно для заполнения',
                    },
                  }}
                />
                {errors.full_text && (
                  <span className={styles.errorMessage}>
                    {errors.full_text.message}
                  </span>
                )}

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
                  isDisabled={readOnly}
                  isMulti
                  placeholder={readOnly ? '' : 'Выберите категорию'}
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
              disabled={readOnly}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={tagOptions}
                  isDisabled={readOnly}
                  placeholder={null}
                  styles={stylesFromTag}
                  inputId={Date.now().toString()}
                />
              )}
            />
          </div>
        </div>
        {!readOnly && (
          <div>
            <p className={styles.required}>
              *обозначены обязательные для заполнения поля
            </p>
            <Button
              className={styles.buttonOnsubmit}
              size={'medium'}
              color={'primary'}
              type="submit"
            >
              Опубликовать
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}
