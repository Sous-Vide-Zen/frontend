import styles from './page.module.scss'
import Layout from '@/components/layout/layout'
import Rightbar from '@/components/layout/rightbar/rightbar'
import Recipes from '@/components/ui/RecipeList/Recipes'

export default async function HomePage() {
  /* 
  WIP: предварительный запрос для сохранение результата в кэше. Как его получить - еще не решено
  const store = makeStore()
  const result = await store.dispatch<any>(
    getRecipes.initiate({
      pathname: 'feed',
      params: { ordering: '-activity_count' },
    }),
  )
  await Promise.all(
    store.dispatch<any>(recipeApi.util.getRunningQueriesThunk()),
  )
  // console.log({ result })
 */

  return (
    <div className={styles.container}>
      <div
        className={`${styles.recipes} scroll scroll--left scroll__thin`}
        id="wrapper"
      >
        <Recipes />
      </div>
      <Rightbar />
    </div>
  )
}
function dispatch(arg0: any): any {
  throw new Error('Function not implemented.')
}
