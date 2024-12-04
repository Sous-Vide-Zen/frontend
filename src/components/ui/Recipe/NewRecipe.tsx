'use client'

import { FC } from 'react'

import styles from './Recipe.module.scss'
import { RecipeFull } from '@/store/features/recipes/recipes.types'
import { RecipePhoto } from '@/components/ui/Recipe/RecipePhoto'
import { RecipeBody } from '.'

const NewRecipe: FC = () => {
  //@ts-ignore
  const recipe: RecipeFull = {}

  return (
    <div className={styles.recipe}>
      <RecipePhoto isNew={true} />
      <RecipeBody recipe={recipe} readOnly={false} />
    </div>
  )
}

export default NewRecipe
