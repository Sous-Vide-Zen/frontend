'use client'
import { FC, useState, useEffect, useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Image from 'next/image'
import Select from 'react-select'

import styles from './recipeBody.module.scss'
import { stylesFromTag } from './addNewRecipeTagSelectStyles'
import { stylesFromCategory } from './addNewRecipeCategorySelectStyles'
import {
  useCreateRecipeDraftMutation,
  usePublicateMutation,
  useGetRecipeDraftsQuery,
  useUpdateRecipeMutation,
} from '@/store/features/recipes/recipes.actions'
import {
  RecipeFormInputs,
  RecipeFull,
} from '@/store/features/recipes/recipes.types'
import { useRedirectIfUserNotAuthorised } from '@/hooks/useRedirectIfUserNotAuthorised'
import hoursToMinutes from '@/helpers/hoursOrMinutes'
import { Button } from '@/components/ui/'
import { FormInput } from '@/components/forms/items'
import { Ingredients } from './Ingredients'
import { RecipePhoto } from '../RecipePhoto'

const textForTitle = {
  validate: (value: string) => {
    const text = value
    if (text.trim() === '') {
      return 'Поле обязательно для заполнения'
    }
    if (text.length > 150) {
      return 'Поле не должно содержать более 150 символов'
    }
    return true
  },
}

type Props = {
  recipe?: RecipeFull
  readOnly: boolean
}

export const RecipeBody: FC<Props> = ({ recipe, readOnly }) => {
  const [slugNewRecipe, setSlugNewRecipe] = useState('')
  const [showMediaIcons, setShowMediaIcons] = useState<boolean>(false)

  // useRedirectIfUserNotAuthorised()

  const [getSlug, { data: recipeDraft, error: draftError }] =
    useCreateRecipeDraftMutation()

  const createDraft = useCallback(async () => {
    try {
      const response = await getSlug().unwrap()
      const slug = response.slug
      setSlugNewRecipe(slug)

      console.log('Recipe draft create', slug)
    } catch (error) {
      console.error('Error creating draft or publishing recipe:', error)
    }
  }, [getSlug])

  // const {
  //   data: drafts,
  //   error: draftsError,
  //   isLoading: draftsLoading,
  // } = useGetRecipeDraftsQuery()

  // useEffect(() => {
  //   if (draftsLoading) return
  //   if (slugNewRecipe === '') {
  //     if (drafts && drafts.length > 0) {
  //       const objectFromDraft = drafts[0]
  //       setSlugNewRecipe(objectFromDraft.slug)
  //     } else {
  //       createDraft()
  //     }
  //   }
  //   console.log(drafts, slugNewRecipe)
  // }, [createDraft, drafts, draftsLoading, slugNewRecipe])

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
    getValues,
    setValue,
  } = useForm<RecipeFormInputs>({
    defaultValues: {
      title: recipe?.title || '',
      hours: readOnly
        ? hoursToMinutes(Math.floor((recipe?.cooking_time ?? 0) / 60) || 0, [
            'час',
            'часа',
            'часов',
          ])
        : '',
      cooking_time: readOnly
        ? hoursToMinutes((recipe?.cooking_time ?? 0) % 60 || 0, [
            'минута',
            'минуты',
            'минут',
          ])
        : '',
      name0: '',
      amount: 0,
      unit0: '',
      full_text: recipe?.full_text || '',
      category: recipe?.category
        ? recipe?.category.map((c: { name: string }) => ({
            label: c.name,
          })) || []
        : [],
      tag: defaultTag,
      ingredients: recipe?.ingredients ?? [],
    },
    mode: 'onBlur',
  })

  const onSubmit = (dataFromInput: any) => {
    const cookingTime =
      parseInt(dataFromInput.cooking_time, 10) + dataFromInput.hours * 60
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
    const ingredients = dataFromInput.ingredients.map((ing: any) => {
      return {
        name: ing.name.trim(),
        amount: parseInt(ing.amount, 10),
        unit: ing.unit.trim(),
      }
    })

    const transformedData = {
      // ...dataFromInput,
      title: dataFromInput.title.trim(),
      cooking_time: cookingTime,
      ingredients: ingredients,
      full_text: dataFromInput.full_text.trim(),
      tag: transformedTags,
      category: transformedCategory,
    }
    handleDraftAndPublish(transformedData)
    console.log('function work', transformedData)
  }

  const displayNoneClass =
    recipe && recipe?.cooking_time < 60
      ? styles.displayNone
      : styles.background4

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.photo_and_title}>
          <RecipePhoto
            isNew={!recipe?.id}
            url={recipe?.preview_image}
            linkButton={true}
            printButton={true}
          />

          <FormInput
            register={register}
            id="title"
            type="text"
            options={textForTitle}
            className={styles.titleInput}
            placeholder="Название рецепта*"
            disabled={readOnly}
          />
          {errors.title && (
            <span className={styles.errorMessage}>{errors.title.message}</span>
          )}
        </div>
        <div className={styles.cockingTime_container}>
          <p className={styles.cockingTime}>Время приготовления*</p>
          <div className={styles.hourPlusMinutes}>
            <div className={`${styles.hours} ${displayNoneClass}`}>
              <input
                {...register('hours', {
                  validate: (value) => {
                    if (!value) return true
                    const hours = parseInt(value, 10)
                    if (isNaN(hours) || hours < 0) {
                      return 'Введите корректное число'
                    }
                    return true
                  },
                })}
                id="hours"
                type="text"
                placeholder="часы"
                disabled={readOnly}
              />
              {errors.hours && (
                <span className={styles.errorMessage}>
                  {errors.hours.message}
                </span>
              )}
            </div>
            <div className={styles.minutes}>
              <FormInput
                register={register}
                id="cooking_time"
                type="text"
                placeholder="минуты"
                disabled={readOnly}
                options={{
                  validate: (value) => {
                    const hoursElement = document.getElementById(
                      'hours',
                    ) as HTMLInputElement | null
                    const hoursValue = hoursElement
                      ? parseInt(hoursElement.value, 10)
                      : 0
                    const text = value
                    if (text.trim() === '' && !hoursValue) {
                      return 'Поле обязательно для заполнения'
                    }
                    const minutes = parseInt(value, 10)
                    if (isNaN(minutes) && !hoursValue) {
                      return 'Введите корректное число'
                    }
                    if (minutes <= 9 && !hoursValue) {
                      return 'Время не должно быть меньше 10 минут'
                    }
                    if (minutes + hoursValue * 60 > 1440) {
                      return 'Количество не должно быть больше 1440'
                    }
                    return true
                  },
                }}
              />
              {errors.cooking_time && (
                <p className={styles.errorMessage}>
                  {errors.cooking_time.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className={styles.ingredients_container}>
          <p className={styles.ingredients}>Ингредиенты*</p>
          <Ingredients
            readOnly={readOnly}
            control={control}
            getValues={getValues}
            register={register}
            setValue={setValue}
            errors={errors}
          />
        </div>
        <div className={styles.cocking_container}>
          <p className={styles.cocking}>Приготовление*</p>
          <div className={styles.full_text}>
            {readOnly && <p className={styles.textArea}>{recipe?.full_text}</p>}
            {!readOnly && (
              <>
                <textarea
                  {...register('full_text', {
                    validate: (value) => {
                      const text = value
                      if (text.trim() === '') {
                        return 'Поле обязательно для заполнения'
                      }
                      return true
                    },
                  })}
                  className={styles.textArea}
                  id="full_text"
                  placeholder="впишите сюда текст рецепта"
                  disabled={readOnly}
                ></textarea>
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
          {errors.full_text && (
            <span className={styles.errorMessage}>
              {errors.full_text.message}
            </span>
          )}
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
