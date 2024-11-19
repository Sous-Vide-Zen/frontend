'use client'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import styles from '../forms.module.scss'
import { Field, FieldSet, FormInput } from '../items'
import { Button } from '@/components/ui'
import { IRecipeWithIngredients } from '@/store/features/recipes/recipes.types'
import { Loader } from '@/components/ui/Loader/Loader'
import { useSaveRecipeMutation } from '@/store/features/recipes/recipes.actions'

type Params = {
  recipeData?: IRecipeWithIngredients
}
const EditRecipeForm: FC<Params> = ({ recipeData }) => {
  const [saveRecipe, { data, isLoading, error }] = useSaveRecipeMutation()
  //@ts-ignore
  const errorText = error?.message
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<IRecipeWithIngredients>({
    mode: 'onBlur',
  })

  const onSubmit = (formValues: IRecipeWithIngredients) => {
    recipeData?.slug && saveRecipe({ slug: recipeData.slug, data: formValues })
  }

  if (!recipeData) return <Loader />

  return (
    <div className={styles.container}>
      <h3>Пример формы редактирования рецепта</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <Field label="Title" error={errors.title?.message}>
            <FormInput
              register={register}
              id="title"
              options={{
                value: recipeData.title,
                onChange: (e) => setValue('title', e.target.value),
              }}
            />
          </Field>

          <Field label="Full Text" error={errors.full_text?.message}>
            <FormInput
              register={register}
              id="full_text"
              options={{
                value: recipeData.full_text,
                onChange: (e) => setValue('full_text', e.target.value),
              }}
            />
          </Field>
        </FieldSet>

        <Button
          disabled={/* !isDirty || */ !isValid}
          type="submit"
          color="primary"
          size="big"
          loading={isLoading}
        >
          Сохранить
        </Button>

        {errorText && (
          <span role="alert" className={styles.error}>
            {errorText}
          </span>
        )}
      </form>
    </div>
  )
}

export default EditRecipeForm
