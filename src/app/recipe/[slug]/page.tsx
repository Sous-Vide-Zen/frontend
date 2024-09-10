import { FC } from 'react'
import Link from 'next/link'
import { permanentRedirect } from 'next/navigation'

import RecipeModify from '@/components/ui/RecipeModify/RecipeModify'
import { getRecipeData } from '@/ssr/api/recipe'
import { IRecipeWithIngredients } from '@/store/features/recipes/recipes.types'

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
  let data: IRecipeWithIngredients | undefined

  try {
    data = await getRecipeData(params.slug)
  } catch (error) {
    console.log({ error })
  }

  if (!data) permanentRedirect('/wrong_page')

  return (
    <>
      <Link href={`/recipe/edit/${params.slug}`}>Изменить</Link>
      <RecipeModify recipe={data} slug={''} pub_date={''}/>
    </>
  )
}

export default RecipePage
