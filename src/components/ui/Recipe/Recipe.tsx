'use client'

import { FC, useState, useEffect } from 'react'

import styles from './Recipe.module.scss'
import { RecipeFull } from '@/store/features/recipes/recipes.types'
import { IconsAndActions, RecipeBody, UserNameShow } from '.'
import { RecipePhoto } from './RecipePhoto'
import Comments from './Comments/comments'
import { Skeleton } from '../Skeletons'
import { useAuth } from '@/hooks/useAuth'

interface RecipeCardProps {
  recipe?: RecipeFull
  readOnly: boolean
}

const Recipe: FC<RecipeCardProps> = ({ recipe, readOnly = false }) => {
  const [isMyRecipe, setIsMyRecipe] = useState(false)
  const [isNotOlder24Hours, setIsNotOlder24Hours] = useState(true)
  const { slug, views_count, reactions_count, author, pub_date } = { ...recipe }
  const userProps = { author, pub_date, slug, readOnly }
  const iconProps = { slug, views_count, reactions_count }
  const userData = useAuth()

  console.log(userData, recipe)

  useEffect(() => {
    if (userData?.is_admin || userData?.is_staff) {
      setIsMyRecipe(true)
    } else if (userData?.id === recipe?.author.id) {
      setIsMyRecipe(true)
      if (pub_date)
        new Date().getTime() - new Date(pub_date).getTime() >
        24 * 60 * 60 * 1000
          ? setIsNotOlder24Hours(false)
          : setIsNotOlder24Hours(true)
    }
  }, [userData, recipe, pub_date])

  if (!recipe) return <Skeleton />

  return (
    <div className={styles.recipe}>
      <UserNameShow
        {...userProps}
        isMyRecipe={isMyRecipe}
        isNotOlder24Hours={isNotOlder24Hours}
      />
      <IconsAndActions {...iconProps} />
      <RecipePhoto
        isNew={false}
        url={recipe.preview_image}
        linkButton={true}
        printButton={true}
      />
      <RecipeBody recipe={recipe} readOnly={readOnly} />
      {/* Pass UserData to Comments component */}
      <Comments slug={recipe.slug} />
    </div>
  )
}

export default Recipe
