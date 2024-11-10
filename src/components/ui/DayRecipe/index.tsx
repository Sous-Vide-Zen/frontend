'use client'

import { FC } from 'react'

import styles from './DayRecipe.module.scss'
import RecipePreview from '@/components/ui/RecipePreview'

const DayRecipe: FC = () => {
  return (
    <div className={styles.topRecipe}>
      <h2>Рецепт дня</h2>
      <RecipePreview />
    </div>
  )
}

export default DayRecipe
