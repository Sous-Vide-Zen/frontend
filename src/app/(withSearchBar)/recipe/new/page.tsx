import styles from '../recipe.module.scss'
import NewRecipe from '@/components/ui/Recipe/NewRecipe'

const NewRecipePage = async () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} scroll scroll--left scroll__thin`}>
        <NewRecipe />
      </div>
    </div>
  )
}
export default NewRecipePage
