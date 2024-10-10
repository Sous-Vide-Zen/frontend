'use client'
import Layout from '@/components/layout/layout'
import { useState, useEffect } from 'react'
import styles from './addRecipe.module.scss'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button/Button'
import Input from '@/components/ui/Input/Input'
import { Controller, useForm } from 'react-hook-form'
import { Loader } from '@/components/ui/Loader/Loader'
import Image from 'next/image'
import Select from 'react-select'
// import Creatable, { useCreatable } from 'react-select/creatable';
import CreatableSelect from 'react-select/creatable'
import { stylesFromCategory } from './addNewRecipeCategorySelectStyles'
import { stylesFromTag } from './addNewRecipeTagSelectStyles'
import IngredientsShowEndAdd from '@/components/ui/RecipeComponents/IngredientsShowEndAdd/ingredientsShowEndAdd'

export default function AddNewRecipe({
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
  console.log(recipe)
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
      : [{ label: '' }]
  /* RHF data */
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    control,
  } = useForm({
    defaultValues: {
      hours: Math.floor(recipe?.cooking_time / 60) || '',
      cooking_time: recipe?.cooking_time % 60 || '',
      full_text: recipe?.full_text || '',
      category: recipe?.category.map((c: { name: string }) => ({
        label: c.name,
      })) || [{ label: '' }],
      tag: defaultTag,
    },
    mode: 'onBlur',
  })
  const onSubmit = (dataFromInput: any) => {
    console.log(dataFromInput)
  }
  /* */

  return (
    <Layout isSearch={false} sidebar={false}>
      <div></div>
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
              <div className={styles.hours}>
                <Input
                  register={register}
                  name="hours"
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
                <Input
                  register={register}
                  name="cooking_time"
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
                    <Input
                      register={register}
                      name="name"
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
                    <Input
                      register={register}
                      name="unit"
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
                    <Input
                      register={register}
                      name="amount"
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
              <Input
                className={styles.textArea}
                register={register}
                name="full_text"
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
              {!notShow && (
                <button
                  onClick={(e) => {
                    e.preventDefault(), setShowMediaIcons(!showMediaIcons)
                  }}
                  className={styles.cockingButton}
                >
                  +
                </button>
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
                    isMulti
                    placeholder="Выберите категорию"
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
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={options}
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
      <div></div>
    </Layout>
  )
}
