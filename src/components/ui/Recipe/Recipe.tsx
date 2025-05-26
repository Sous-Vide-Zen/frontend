'use client'

import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import styles from './Recipe.module.scss'
import { RecipeFull } from '@/store/features/recipes/recipes.types'
import { useAuth } from '@/hooks/useAuth'
import { IconsAndActions, RecipeBody, UserNameShow } from '.'
import Comments from './Comments/comments'
import { Skeleton } from '../Skeletons'
import { useCheckDraftSlug } from '@/helpers/useCheckChernovikSlug'

interface RecipeCardProps {
  recipe?: RecipeFull
  readOnly: boolean
}

const Recipe: FC<RecipeCardProps> = ({ recipe, readOnly = false }) => {
  const router = useRouter()
  const [isMyRecipe, setIsMyRecipe] = useState(false)
  const [allowEdit, setAllowEdit] = useState(false)
  const { slug, views_count, reactions_count, author, pub_date } = { ...recipe }
  const userProps = { author, pub_date, slug, readOnly }
  const iconProps = { slug, views_count, reactions_count }
  const userData = useAuth()
  const hasDraft = useCheckDraftSlug(recipe?.slug)
  console.log('recipe status user and data', userData, { recipe, readOnly })
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
      (userData?.id === recipe?.author.id && isNotOlder24Hours()) ||
      (userData?.id === recipe?.author.id && hasDraft)

    if (!readOnly && !realAllowEdit) {
      router.back()
    }

    setAllowEdit(realAllowEdit)
    setIsMyRecipe(
      userData?.is_admin ||
        userData?.is_staff ||
        userData?.id === recipe?.author.id,
    )
  }, [readOnly, recipe, router, userData, hasDraft])

  if (!recipe) return <Skeleton />

  return (
    <div className={styles.recipe}>
      <UserNameShow
        {...userProps}
        isMyRecipe={isMyRecipe}
        allowEdit={allowEdit}
      />
      <IconsAndActions {...iconProps} />
      <RecipeBody recipe={recipe} readOnly={readOnly} />
      {/* Pass UserData to Comments component */}
      <Comments slug={recipe.slug} />
    </div>
  )
}

export default Recipe
