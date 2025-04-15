'use client'
import { FC, useState, useEffect } from 'react'
import styles from './MyRecipies.module.scss'
// import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  useGetRecipeDraftsQuery,
  useGetRecipeQuery,
} from '@/store/features/recipes/recipes.actions'
// import { useRecipes } from '@/hooks/useRecipes'
// import { RecipeList } from '@/components/ui/RecipeList'
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
  console.log(dataRecipe)

  return (
    <>
      {dataRecipe && Object.keys(dataRecipe).length > 0 ? (
        <div></div>
      ) : (
        // <RecipeCard key={dataRecipe.id} recipe={dataRecipe} />
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

  // const { myRecipesSort, myRecipesFromDate } = useAppSelector(
  //   (state) => state.userSettings,
  // )
  // const dispatch = useAppDispatch()
  // const ordering = myRecipesSort === 'ingredients' ? undefined : undefined //todo: после реализации изменить
  // const dispatcher = useRecipes('feed', { username, ordering })

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
