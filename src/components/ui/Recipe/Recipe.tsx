'use client'

import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
  console.log({ recipe, readOnly })

  const router = useRouter()
  const [isMyRecipe, setIsMyRecipe] = useState(false)
  const [allowEdit, setAllowEdit] = useState(false)
  const { slug, views_count, reactions_count, author, pub_date } = { ...recipe }
  const userProps = { author, pub_date, slug, readOnly }
  const iconProps = { slug, views_count, reactions_count }
  const userData = useAuth()

  useEffect(() => {
    const isNotOlder24Hours = () => {
      if (!recipe?.pub_date) {
        return true
      }

      const publicationDate = new Date(recipe?.pub_date)
      const currentDate = new Date()
      const timeDiff = currentDate.getTime() - publicationDate.getTime()
      const hoursDiff = timeDiff / (1000 * 3600)
      return hoursDiff < 24
    }

    const realAllowEdit =
      userData?.is_admin ||
      userData?.is_staff ||
      (userData?.id === recipe?.author.id && isNotOlder24Hours())

    if (!readOnly && !realAllowEdit) {
      router.back()
    }

    setAllowEdit(realAllowEdit)
    setIsMyRecipe(
      userData?.is_admin ||
        userData?.is_staff ||
        userData?.id === recipe?.author.id,
    )
  }, [readOnly, recipe, router, userData])

  if (!recipe) return <Skeleton />

  return (
    <div className={styles.recipe}>
      <UserNameShow
        {...userProps}
        isMyRecipe={isMyRecipe}
        allowEdit={allowEdit}
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
