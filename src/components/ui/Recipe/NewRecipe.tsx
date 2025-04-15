'use client'
import { useSearchParams } from 'next/navigation'
import { FC, useState, useEffect, useCallback } from 'react'
import styles from './Recipe.module.scss'
// import { RecipeFull } from '@/store/features/recipes/recipes.types'
import { RecipePhoto } from '@/components/ui/Recipe/RecipePhoto'
import { RecipeBody } from '.'
import {
  useGetRecipeDraftsQuery,
  useGetRecipeQuery,
} from '@/store/features/recipes/recipes.actions'

const NewRecipe: FC = () => {
  const [params] = useSearchParams()
  let recipeSlug = ''

  console.log('new, dataRecipe', params)

  if (params !== undefined) {
    recipeSlug = params[0]
  }
  // const [recipeSlug, setRecipeSlug] = useState<string>('')

  const {
    data: dataRecipe,
    error: recipeError,
    isLoading: recipeLoading,
  } = useGetRecipeQuery(recipeSlug, {
    skip: !recipeSlug,
  })

  return (
    <div className={styles.recipe}>
      <RecipePhoto isNew={true} />
      <RecipeBody recipe={dataRecipe} readOnly={false} />
    </div>
  )
}

export default NewRecipe
