'use client'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'
import styles from './Recipe.module.scss'
import { RecipeBody } from '.'
import { useGetRecipeQuery } from '@/store/features/recipes/recipes.actions'

const NewRecipe: FC = () => {
  //@ts-ignore
  const recipe: RecipeFull = {}
  const [params] = useSearchParams()
  let recipeSlug = ''

  console.log('new, dataRecipe', params)

  if (params !== undefined) {
    recipeSlug = params[0]
  }
  // const [recipeSlug, setRecipeSlug] = useState<string>('')

  const {
    data: dataRecipe,
    error: recipeError,
    isLoading: recipeLoading,
  } = useGetRecipeQuery(recipeSlug, {
    skip: !recipeSlug,
  })

  return (
    <div className={styles.recipe}>
      <RecipeBody recipe={recipe} readOnly={false} />
    </div>
  )
}

export default NewRecipe
