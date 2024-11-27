'use client'

import { FC } from 'react'

import styles from './RecipeModify.module.scss'
import { RecipeFull } from '@/store/features/recipes/recipes.types'
import AddNewRecipe from '@/app/(withSearchBar)/recipe/new/page'
import UserNameShow from './UserNameShow/userNameShow'
import IconsAndActions from './IconsAndActions/iconsAndActions'
import Preview from './Preview/preview'

interface RecipeCardProps {
  recipe?: RecipeFull
}

const RecipeModify: FC<RecipeCardProps> = ({ recipe }) => {
  if (!recipe) {
    return 'no - data'
  } else
    return (
      <div className={styles.recipe}>
        {/* <div className={styles.content}> */}
        <UserNameShow recipe={recipe} />
        {/* string of views likes and need to add edit and delete */}
        <IconsAndActions recipe={recipe} />
        {/* photo of the dishes that you need to add an icon in the lower left corner */}
        <Preview recipe={recipe} />
        <AddNewRecipe recipe={recipe} notShowProps={true} />
        {/* </div> */}
      </div>
    )
}

export default RecipeModify
