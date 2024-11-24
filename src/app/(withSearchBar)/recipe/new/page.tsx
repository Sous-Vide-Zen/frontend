'use client'
import Layout from '@/components/layout/layout'
import { useState, useEffect } from 'react'
// import styles from './addRecipe.module.scss'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/'
import { FormInput } from '@/components/forms/items'
import { Controller, useForm } from 'react-hook-form'
import { Loader } from '@/components/ui/Loader/Loader'
import Image from 'next/image'
import Select from 'react-select'
// import Creatable, { useCreatable } from 'react-select/creatable';
import CreatableSelect from 'react-select/creatable'
import { stylesFromCategory } from './addNewRecipeCategorySelectStyles'
import { stylesFromTag } from './addNewRecipeTagSelectStyles'
import IngredientsShowEndAdd from '@/components/ui/RecipeModify/IngredientsShowEndAdd/ingredientsShowEndAdd'

import styles from '../mutationRecipe.module.scss'

export default function NewRecipePage({
  recipe,
  notShowProps,
}: {
  recipe: any
  notShowProps: boolean
}) {
  const router = useRouter()
  const [showMediaIcons, setShowMediaIcons] = useState<boolean>(false)
  const [notShow, setNotShow] = useState(false)
  useEffect(() => {
    setNotShow(notShowProps)
  }, [notShowProps])
  // console.log(recipe)
  /* тестовые данные для селекта*/

  const options: { value: string; label: string }[] = [
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
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, touchedFields },
  //   control,
  // } = useForm({
  //   defaultValues: {
  //     hours: `${Math.floor(recipe?.cooking_time / 60)} часов` || '',
  //     cooking_time: `${recipe?.cooking_time % 60} минут` || '0 минут',
  //     full_text: recipe?.full_text || '',
  //     category:
  //       recipe?.category.map((c: { name: string }) => ({
  //         label: c.name,
  //       })) || [],
  //     tag: defaultTag,
  //   },
  //   mode: 'onBlur',
  // })

  const getCorrectDeclension = (count: number, wordForms: string[]) => {
    return count % 10 === 1 && count % 100 !== 11
      ? wordForms[0]
      : count % 10 >= 2 &&
          count % 10 <= 4 &&
          (count % 100 < 10 || count % 100 >= 20)
        ? wordForms[1]
        : wordForms[2]
  }

  //внутри самой карточки отображается корректное время приготовления рецепта.
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      hours:
        `${Math.floor(recipe?.cooking_time / 60)} ${getCorrectDeclension(Math.floor(recipe?.cooking_time / 60), ['час', 'часа', 'часов'])}` ||
        '',
      cooking_time:
        recipe?.cooking_time % 60 > 0
          ? `${recipe?.cooking_time % 60} ${getCorrectDeclension(recipe?.cooking_time % 60, ['минута', 'минуты', 'минут'])}`
          : '', // Если минут 0, то поле будет пустым
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
                  options={options}
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
                  options={options}
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
