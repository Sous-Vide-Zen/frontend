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
  useUpdateRecipeMutation,
} from '@/store/features/recipes/recipes.actions'
import { useRedirectIfUserNotAuthorised } from '@/hooks/useRedirectIfUserNotAuthorised'

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

interface FormInputs {
  title: string
  hours: string
  cooking_time: string
  name0: string
  amount: number // Изменено, для массива можно использовать другой подход
  unit0: string
  full_text: string
  category: { label: string }[]
  tag: { label: string }[]
}

export const RecipeBody: FC<Props> = ({ recipe, readOnly }) => {
  const router = useRouter()
  const [slugNewRecipe, setSlugNewRecipe] = useState('')
  const [showMediaIcons, setShowMediaIcons] = useState<boolean>(false)
  const [ingredientsNumber, setIngredientsNumber] = useState<number[]>([1])

  useRedirectIfUserNotAuthorised()

  const [getSlug, { data: recipeDraft, error: draftError }] =
    useCreateRecipeDraftMutation()
  const createDraft = async () => {
    try {
      const response = await getSlug().unwrap()
      const slug = response.slug
      setSlugNewRecipe(slug)

      console.log('Recipe draft create', slug)
    } catch (error) {
      console.error('Error creating draft or publishing recipe:', error)
    }
  }

  const {
    data: drafts,
    error: draftsError,
    isLoading: draftsLoading,
  } = useGetRecipeDraftsQuery()
  useEffect(() => {
    if (draftsLoading) return
    if (slugNewRecipe === '') {
      if (drafts && drafts.length > 0) {
        const objectFromDraft = drafts[0]
        setSlugNewRecipe(objectFromDraft.slug)
      } else {
        createDraft()
      }
    }
    console.log(drafts, slugNewRecipe)
  }, [drafts, draftsLoading, slugNewRecipe])

  const [update, { data: recipeUpdate, error: UpdateError }] =
    useUpdateRecipeMutation()
  const [publicate, { data: recipePublic, error: publishError }] =
    usePublicateMutation()
  const handleDraftAndPublish = async (dataFromFunction: any) => {
    try {
      await update({
        slug: slugNewRecipe,
        data: dataFromFunction,
      }).unwrap()
      await publicate({
        slug: slugNewRecipe,
        data: {},
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
  const categoryOptions: { value: number; label: string }[] = [
    { value: 1, label: 'Завтрак' },
    { value: 2, label: 'Обед' },
    { value: 3, label: 'Ужин' },
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
  } = useForm<FormInputs>({
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
      name0: '',
      amount: 1,
      unit0: '',
      full_text: recipe?.full_text || '',
      category: recipe?.category
        ? recipe?.category.map((c: { name: string }) => ({
            label: c.name,
          })) || []
        : [],
      tag: defaultTag,
    },
    mode: 'onBlur',
  })

  const addIngredientField = () => {
    setIngredientsNumber((prevIngredients) => [
      ...prevIngredients,
      prevIngredients.length + 1,
    ])
  }

  const removeIngredientField = (indexToRemove: number) => {
    setIngredientsNumber((prevIngredients) =>
      prevIngredients.filter((_, index) => index !== indexToRemove),
    )
  }

  const onSubmit = (dataFromInput: any) => {
    const cookingTime = parseInt(dataFromInput.cooking_time, 10)

    const ingredients = ingredientsNumber.map((ing, index) => {
      const nameKey = `name${index}`
      const amountKey = `amount${index}`
      const unitKey = `unit${index}`

      return {
        name: dataFromInput[nameKey],
        amount: dataFromInput[amountKey],
        unit: dataFromInput[unitKey],
      }
    })

    const transformedTags = dataFromInput.tag
      ? dataFromInput.tag.map(
          (item: { value: string; label: string }) => item.value,
        )
      : []
    const transformedCategory = dataFromInput.category
      ? dataFromInput.category.map(
          (item: { value: string; label: string }) => item.value,
        )
      : []

    const transformedData = {
      // ...dataFromInput,
      title: dataFromInput.title,
      cooking_time: cookingTime,
      ingredients,
      full_text: dataFromInput.full_text,
      tag: transformedTags,
      category: transformedCategory,
    }
    handleDraftAndPublish(transformedData)
    console.log('function work', transformedData)
  }

  let displayNoneClass =
    recipe && recipe?.cooking_time < 60
      ? styles.displayNone
      : styles.background4
  /* */
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          register={register}
          id="title"
          type="text"
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
                    if (minutes <= 9) {
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
                {ingredientsNumber.map((ingredient, index) => (
                  <div key={index} className={styles.ingredientFields}>
                    <div className={styles.name}>
                      <FormInput
                        register={register}
                        id={`name${index}`}
                        type="text"
                        options={textOptions}
                        // className={styles.titleInput}
                        placeholder="название"
                      />
                      {errors[`name${index}` as keyof FormInputs] && (
                        <span className={styles.errorMessage}>
                          {errors[`name${index}` as keyof FormInputs]?.message}
                        </span>
                      )}
                    </div>
                    <div className={styles.amount}>
                      <FormInput
                        register={register}
                        id={`amount${index}`}
                        type="text"
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
                      {errors[`amount${index}` as keyof FormInputs] && (
                        <span className={styles.errorMessage}>
                          {
                            errors[`amount${index}` as keyof FormInputs]
                              ?.message
                          }
                        </span>
                      )}
                    </div>
                    <div className={styles.unit}>
                      <FormInput
                        register={register}
                        id={`unit${index}`}
                        type="text"
                        options={textOptions}
                        // className={styles.titleInput}
                        placeholder="кг"
                      />
                      {errors[`unit${index}` as keyof FormInputs] && (
                        <span className={styles.errorMessage}>
                          {errors[`unit${index}` as keyof FormInputs]?.message}
                        </span>
                      )}
                    </div>
                    {index > 0 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          removeIngredientField(index)
                        }}
                        className={styles.ingredientsButton}
                      >
                        -
                      </button>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {!readOnly && (
          <button
            onClick={(e) => {
              e.preventDefault()
              addIngredientField()
            }}
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
                  options={categoryOptions}
                  isDisabled={readOnly}
                  isMulti
                  placeholder={readOnly ? '' : 'Выберите категорию'}
                  styles={stylesFromCategory}
                  inputId={Date.now().toString()}
                />
              )}
            />
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
                  options={tagOptions}
                  isDisabled={readOnly}
                  isMulti
                  placeholder={readOnly ? '' : 'Выберите хэштег'}
                  // placeholder={null}
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
