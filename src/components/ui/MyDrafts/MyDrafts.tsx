'use client'

import { FC, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import styles from './MyRecipies.module.scss'
import { useGetRecipeQuery } from '@/store/features/recipes/recipes.actions'
import { useDrafts } from '@/hooks/useDrafts'
import { RecipeCard } from '@/components/ui/RecipeList/RecipeCard'

type Props = {
  recipeSlug: string
}

const DataRecipe: FC<Props> = ({ recipeSlug }) => {
  const {
    data: dataRecipe,
    error: recipeError,
    isLoading: recipeLoading,
  } = useGetRecipeQuery(recipeSlug, {
    skip: !recipeSlug,
  })

  const router = useRouter()
  const toggleIngredients = (slug: string) => router.push(`/recipe/${slug}`)
  
  return (
    <>
      {dataRecipe && Object.keys(dataRecipe).length > 0 ? (
        <RecipeCard
          key={dataRecipe.id}
          recipe={{
            ...dataRecipe,
            short_text: 'test',
            comments_count: 0,
            views_count: 0,
            activity_count: 0,
            is_favorite: false,
          }}
          onPreview={toggleIngredients}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

type MyRecipiesProps = { username?: string }

const MyDrafts: FC<MyRecipiesProps> = ({ username }) => {
  const { drafts, status, loadDrafts } = useDrafts()

  useEffect(() => {
    if (status === 'uninitialized') loadDrafts()
  }, [loadDrafts, status])

  return (
    <div className={styles.container}>
      {drafts?.map((draft, item) => (
        <div key={item}>
          <DataRecipe recipeSlug={draft.slug} />
        </div>
      ))}
    </div>
  )
}

export default MyDrafts
