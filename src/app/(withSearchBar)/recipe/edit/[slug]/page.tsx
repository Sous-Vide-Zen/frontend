import { FC } from 'react'
import { permanentRedirect } from 'next/navigation'

import styles from '../../mutationRecipe.module.scss'
import EditRecipeForm from '@/components/forms/recipe/EditRecipeForm'
import { getRecipeData } from '@/ssr/api/recipe'
import { IRecipeWithIngredients } from '@/store/features/recipes/recipes.types'

type Props = {
  params: { slug: string }
}

const EditRecipePage: FC<Props> = async ({ params }) => {
  let data: IRecipeWithIngredients | undefined

  try {
    data = await getRecipeData(params.slug)
  } catch (error) {
    console.log({ error })
  }

  if (!data) permanentRedirect('/wrong_page')

  return (
    <div className={styles.wrapper}>
      <EditRecipeForm recipeData={data} />
    </div>
  )
}

export default EditRecipePage
