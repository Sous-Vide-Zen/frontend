import { FC } from 'react'
import { permanentRedirect } from 'next/navigation'

import styles from '../recipe.module.scss'
import { RecipeFull } from '@/store/features/recipes/recipes.types'
import { getRecipeData } from '@/ssr/api/recipe'
import Recipe from '@/components/ui/Recipe/Recipe'
import Rightbar from '@/components/layout/rightbar/rightbar'

/*
  для ограничения списка рецептов можно использовать:

  export const dynamicParams = false

  export async function generateStaticParams() {
    // заполнить вручную, либо данными из БД
    return [
      { slug: 'ddie-folgenden-codes-sind-implementierungen' },
      { slug: 'kakoj-to-recept' },
    ]
  }
*/

type Props = {
  params: { slug: string }
}

const RecipePage: FC<Props> = async ({ params }) => {
  let data: RecipeFull | undefined

  try {
    data = await getRecipeData(params.slug)
  } catch (error) {
    console.log({ error })
  }

  if (!data) permanentRedirect('/error404')

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} scroll scroll--left scroll__thin`}>
        <Recipe recipe={data} readOnly={true} />
      </div>
      <Rightbar showListViewButtons={false} showSortButtons={false} />
    </div>
  )
}

export default RecipePage
