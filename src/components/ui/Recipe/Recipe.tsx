'use client'

import { FC, useState, useEffect } from 'react'

import styles from './Recipe.module.scss'
import { RecipeFull } from '@/store/features/recipes/recipes.types'
import { IconsAndActions, RecipeBody, UserNameShow } from '.'
import { RecipePhoto } from './RecipePhoto'
import Comments from './/Comments/comments'
import { Skeleton } from '../Skeletons'
import { useGetCurrentAuthUserDataQuery } from '@/store/features/auth/auth.actions'

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
  const { data: UserData } = useGetCurrentAuthUserDataQuery()

  useEffect(() => {
    const countingTimeAfterPublication = () => {
      if (pub_date) {
        const publicationDate = new Date(pub_date)
        const currentDate = new Date()
        const timeDiff = currentDate.getTime() - publicationDate.getTime()
        const hoursDiff = timeDiff / (1000 * 3600)
        setIsNotOlder24Hours(hoursDiff < 24)
      }
    }

    if (UserData?.is_admin) {
      setIsMyRecipe(true)
    } else if (UserData?.id === recipe?.author.id) {
      setIsMyRecipe(true)
      countingTimeAfterPublication()
    }
  }, [UserData, recipe, pub_date])

  useEffect(() => {
    if (UserData?.is_admin || UserData?.is_staff) {
      setIsMyRecipe(true)
    } else if (UserData?.id === recipe?.author.id) {
      setIsMyRecipe(true)
      if (pub_date)
        new Date().getTime() - new Date(pub_date).getTime() >
        24 * 60 * 60 * 1000
          ? setIsNotOlder24Hours(false)
          : setIsNotOlder24Hours(true)
    }
  }, [UserData, recipe, pub_date])

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
      <Comments slug={recipe.slug} />
    </div>
  )
}

export default Recipe
