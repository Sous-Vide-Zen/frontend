'use client'
import { permanentRedirect, useSearchParams } from 'next/navigation'
import { FC } from 'react'
import styles from './Recipe.module.scss'
import { RecipeBody } from '.'
import { useGetRecipeQuery } from '@/store/features/recipes/recipes.actions'

const NewRecipe: FC = () => {
  const [params] = useSearchParams()
  let recipeSlug = ''

  if (params !== undefined) {
    recipeSlug = params[0]
  }

  const {
    data: dataRecipe,
    error: recipeError,
    isLoading: recipeLoading,
  } = useGetRecipeQuery(recipeSlug, {
    skip: !recipeSlug,
  })

  if (!dataRecipe) {
    permanentRedirect('/error404')
  }

  return (
    <div className={styles.recipe}>
      <RecipeBody recipe={dataRecipe} readOnly={false} />
    </div>
  )
}

export default NewRecipe
