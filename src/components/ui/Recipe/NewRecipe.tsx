'use client'
import { permanentRedirect, useSearchParams } from 'next/navigation'
import { FC, useState, useEffect } from 'react'
import styles from './Recipe.module.scss'
import { RecipeBody } from '.'
import { useGetRecipeQuery } from '@/store/features/recipes/recipes.actions'
import { RecipeFull } from '@/store/features/recipes/recipes.types'

const emptyRecipe: RecipeFull = {
  id: 0,
  title: '',
  slug: '',
  author: { id: 0, username: '' },
  preview_image: '',
  tag: [],
  category: [],
  cooking_time: 0,
  pub_date: '',
  reactions_count: 0,
  ingredients: [],
  full_text: '',
  updated_at: '',
  views_count: 0,
}

const NewRecipe: FC = () => {
  const params = useSearchParams()
  const recipeSlug = params?.get('slug') ?? ''

  const [timeOpen, setTimeOpen] = useState<boolean>(recipeSlug === '')
  const [newRecipe, setNewRecipe] = useState<RecipeFull>(emptyRecipe)
  // console.log('new recipe', params, timeOpen)
  const {
    data: dataRecipe,
    error: recipeError,
    isLoading: recipeLoading,
  } = useGetRecipeQuery(recipeSlug, {
    skip: !recipeSlug,
  })

  useEffect(() => {
    if (dataRecipe) {
      setNewRecipe(dataRecipe)
      setTimeOpen(true)
    }
  }, [dataRecipe])

  return (
    <div className={styles.recipe}>
      {timeOpen && <RecipeBody recipe={newRecipe} readOnly={false} />}
    </div>
  )
}

export default NewRecipe
