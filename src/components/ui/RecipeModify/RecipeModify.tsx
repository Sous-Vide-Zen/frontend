'use client'

import { FC, useState, useEffect } from 'react'
import { IRecipe } from '@/store/features/recipes/recipes.types'
import Image from 'next/image'
import styles from './RecipeModify.module.scss'
import { useData } from '@/hooks/useData'
import { useGetRecipeQuery } from '@/store/features/recipes/recipes.actions'
import UserNameShow from './UserNameShow/userNameShow'
import IconsAndActions from './IconsAndActions/iconsAndActions'
import Preview from './Preview/preview'
import AddNewRecipe from '@/app/(withSearchBar)/recipe/new/page'

interface IRecipeWithIngredients extends IRecipe {
  ingredients: any[]
  full_text: string
}
interface RecipeCardProps {
  recipe?: IRecipeWithIngredients
}

const RecipeModify: FC<RecipeCardProps> = ({ recipe }) => {
  if (!recipe) {
    return 'no - data'
  } else
    return (
      <div>
        <div className={styles.recipe}>
          <UserNameShow recipe={recipe} />
          {/* string of views likes and need to add edit and delete */}
          <IconsAndActions recipe={recipe} />
          {/* photo of the dishes that you need to add an icon in the lower left corner */}
          <Preview recipe={recipe} />
          <AddNewRecipe recipe={recipe} notShowProps={true} />
        </div>
      </div>
    )
}

export default RecipeModify
