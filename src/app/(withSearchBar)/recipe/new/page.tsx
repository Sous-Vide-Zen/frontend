import { FC } from 'react'
// import { permanentRedirect } from 'next/navigation'
// import { useSearchParams, useNavigate } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import styles from '../recipe.module.scss'
import { RecipeFull } from '@/store/features/recipes/recipes.types'
import { getRecipeData } from '@/ssr/api/recipe'
import NewRecipe from '@/components/ui/Recipe/NewRecipe'
import { RecipePhoto } from '@/components/ui/Recipe/RecipePhoto'
import { RecipeBody } from '@/components/ui/Recipe/RecipeBody'

// type Props = {
//   params: { slug: string }
// }

const NewRecipePage = async () => {
  // const [params] = useSearchParams()
  // const paymentStatus = params.get('payment_status')
  // let data: RecipeFull | undefined

  // try {
  //   data = await getRecipeData(params.slug)
  //   // data = params
  // } catch (error) {
  //   console.log({ error })
  // }

  // if (!data) permanentRedirect('/error404')

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} scroll scroll--left scroll__thin`}>
        <NewRecipe />
      </div>
    </div>
    // <div className={styles.container}>
    //   <div className={`${styles.wrapper} scroll scroll--left scroll__thin`}>
    //     <RecipePhoto isNew={true} />
    //     {/* <RecipeBody recipe={data} readOnly={false} /> */}
    //   </div>
    // </div>
  )
}
export default NewRecipePage
