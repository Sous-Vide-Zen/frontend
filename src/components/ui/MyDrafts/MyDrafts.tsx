'use client'
import { FC, useState, useEffect } from 'react'
import styles from './MyRecipies.module.scss'
import {
  useGetRecipeDraftsQuery,
  useGetRecipeQuery,
} from '@/store/features/recipes/recipes.actions'
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
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

type MyRecipiesProps = { username?: string }

const MyDrafts: FC<MyRecipiesProps> = ({ username }) => {
  const [draftsData, setDraftsData] = useState<any[]>([])

  const {
    data: drafts,
    error: draftsError,
    isLoading: draftsLoading,
  } = useGetRecipeDraftsQuery()

  useEffect(() => {
    if (draftsLoading) return
    if (drafts) {
      setDraftsData(drafts)
    }
  }, [drafts, draftsLoading])

  return (
    <div className={styles.container}>
      {draftsData.map((draft, item) => (
        <div key={item}>
          <DataRecipe recipeSlug={draft.slug} />
        </div>
      ))}
    </div>
  )
}

export default MyDrafts
