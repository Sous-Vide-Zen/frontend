import { FC } from 'react'
import { permanentRedirect } from 'next/navigation'

import styles from '../../mutationRecipe.module.scss'
import Recipe from '@/components/ui/Recipe/Recipe'
import { getRecipeData } from '@/ssr/api/recipe'
import { RecipeFull } from '@/store/features/recipes/recipes.types'

type Props = {
  params: { slug: string }
}

const EditRecipePage: FC<Props> = async ({ params }) => {
  let data: RecipeFull | undefined

  try {
    data = await getRecipeData(params.slug)
  } catch (error) {
    console.log({ error })
  }

  if (!data) permanentRedirect('/error404')

  return (
    <div className={styles.wrapper}>
      <Recipe recipe={data} readOnly={false} />
    </div>
  )
}

export default EditRecipePage
