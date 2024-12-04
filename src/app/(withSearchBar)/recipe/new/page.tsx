import styles from '../recipe.module.scss'
import NewRecipe from '@/components/ui/Recipe/NewRecipe'

export default function NewRecipePage() {
  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} scroll scroll--left scroll__thin`}>
        <NewRecipe />
      </div>
    </div>
  )
}
