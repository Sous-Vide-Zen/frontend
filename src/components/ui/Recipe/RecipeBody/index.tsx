'use client'

import { FC, useState, useEffect, useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Image from 'next/image'
import Select from 'react-select'

import styles from './recipeBody.module.scss'
import {
  useCreateRecipeDraftMutation,
  usePublicateMutation,
  useUpdateRecipeMutation,
} from '@/store/features/recipes/recipes.actions'
import {
  RecipeFormInputs,
  RecipeFull,
} from '@/store/features/recipes/recipes.types'
import { useDrafts } from '@/hooks/useDrafts'
import hoursToMinutes from '@/helpers/hoursOrMinutes'
import { Button } from '@/components/ui/'
import { FormInput } from '@/components/forms/items'
import { stylesFromTag } from './addNewRecipeTagSelectStyles'
import { stylesFromCategory } from './addNewRecipeCategorySelectStyles'
import { CookingTime } from './CookingTime'
import { Ingredients } from './Ingredients'
import { RecipePhoto } from '../RecipePhoto'
import { ModalPublish } from '@/components/ui/Recipe/RecipeBody/ModalPublish'

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
  const [isModalPublish, setIsModalPublish] = useState(false)
  const [slugNewRecipe, setSlugNewRecipe] = useState('')
  const [showMediaIcons, setShowMediaIcons] = useState<boolean>(false)
  const { loadDrafts, drafts, status } = useDrafts()
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

  useEffect(() => {
    if (status === 'uninitialized') {
      loadDrafts()
    }
  }, [loadDrafts, status])

  //создание черновика если имя не присвоено и его нет в полученном рецепте
  useEffect(() => {
    if (status !== 'fulfilled') return

    if (slugNewRecipe === '') {
      if (recipe?.slug === '') {
        //   if (drafts && drafts.length > 0) {
        //   const objectFromDraft = drafts[2]
        //   setSlugNewRecipe(objectFromDraft.slug)
        // } else {
        console.log('work create draft')
        createDraft()
      } else {
        setSlugNewRecipe(recipe?.slug || '')
      }
    }
  }, [createDraft, drafts, slugNewRecipe, recipe?.slug, status])

  const [update, { data: recipeUpdate, error: UpdateError }] =
    useUpdateRecipeMutation()
  const [publicate, { data: recipePublic, error: publishError }] =
    usePublicateMutation()
  //сохранение черновика
  const handleDraft = async (dataFromFunction: any) => {
    try {
      await update({
        slug: slugNewRecipe,
        data: dataFromFunction,
      }).unwrap()
      console.log('Recipe draft successfully')
    } catch (error) {
      console.error('Error creating draft or publishing recipe:', error)
    }
  }
  //сохранение черновика и его публикация
  const handleDraftAndPublish = async (dataFromFunction: any) => {
    try {
      await update({
        slug: slugNewRecipe,
        data: dataFromFunction,
      }).unwrap()
      console.log('draft and public', slugNewRecipe, dataFromFunction)
      await publicate({
        slug: slugNewRecipe,
        data: {},
      }).unwrap()
      console.log('Recipe published successfully')
      setIsModalPublish(true)
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
          value: c.name,
          label: c.name,
        }))
      : []

  /* RHF data */
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    getValues,
    setValue,
    control,
  } = useForm<RecipeFormInputs>({
    defaultValues: {
      title: recipe?.title || '',
      hours: readOnly
        ? hoursToMinutes(Math.floor((recipe?.cooking_time ?? 0) / 60) || 0, [
            'час',
            'часа',
            'часов',
          ])
        : recipe?.cooking_time
          ? `${Math.floor((recipe?.cooking_time ?? 0) / 60)}`
          : '',
      minutes: readOnly
        ? hoursToMinutes((recipe?.cooking_time ?? 0) % 60 || 0, [
            'минута',
            'минуты',
            'минут',
          ])
        : recipe?.cooking_time
          ? `${(recipe?.cooking_time ?? 0) % 60}`
          : '',
      name0: '',
      amount: 0,
      unit0: '',
      full_text: recipe?.full_text || '',
      category: recipe?.category
        ? recipe?.category.map((c: { name: string; id: number }) => ({
            value: c.id,
            label: c.name,
          })) || []
        : [],
      tag: defaultTag,
      ingredients: recipe?.ingredients ?? [],
    },
    mode: 'onBlur',
  })
  //приведение к требованиям бэка и удаление полей без данных для черновика
  const checkData = (dataFromInput: any) => {
    const cookingTime =
      parseInt(dataFromInput.hours, 10) * 60 + parseInt(dataFromInput.minutes)
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
    const result: any = {
      tag: transformedTags,
      category: transformedCategory,
    }
    if (dataFromInput.title.trim()) {
      result.title = dataFromInput.title.trim()
    }
    if (cookingTime) {
      result.cooking_time = cookingTime
    }
    if (Object.values(ingredients[0].name).length > 0) {
      result.ingredients = ingredients
    }
    if (dataFromInput.full_text.trim()) {
      result.full_text = dataFromInput.full_text.trim()
    }

    return result
  }
  //публикация
  const onSubmit = (dataFromInput: any) => {
    const transformedData = checkData(dataFromInput)
    handleDraftAndPublish(transformedData)
  }
  // сохранение черновика после удаления полей без данных
  const onSaveDraft = (dataFromInput: any) => {
    const transformedData = checkData(dataFromInput)
    handleDraft(transformedData)
  }
  //получение данных из полей без валидации
  const handleDraftButtonClick = () => {
    const dataFromInput = getValues()
    onSaveDraft(dataFromInput)
  }

  // console.log('recipe body', readOnly, slugNewRecipe, recipe)
  return (
    <div>
      <ModalPublish
        isModalOpen={isModalPublish}
        setIsModalOpen={setIsModalPublish}
      />
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
          <p className={styles.cockingTime}>
            Время приготовления{readOnly ? '' : '*'}
          </p>
          <CookingTime
            readOnly={readOnly}
            control={control}
            getValues={getValues}
            register={register}
            setValue={setValue}
            errors={errors}
          />
        </div>
        <div className={styles.ingredients_container}>
          <p className={styles.ingredients}>Ингредиенты{readOnly ? '' : '*'}</p>
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
          <p className={styles.cocking}>Приготовление{readOnly ? '' : '*'}</p>
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
            <div className={styles.containerButton}>
              <Button
                className={styles.buttonOnsubmit}
                size={'medium'}
                color={'primary'}
                type="submit"
                // onClick={() => onSubmit("publish")}
              >
                Опубликовать
              </Button>

              <Button
                className={styles.buttonOnsubmit}
                size={'medium'}
                color={'primary'}
                type="button"
                onClick={handleDraftButtonClick}
              >
                Cохранить в черновиках
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
