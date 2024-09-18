import styles from './favorites.module.scss'
import ListViewChanger from '@/components/ui/ListViewChanger/ListViewChanger'
import Favorites from '@/components/ui/RecipeList/Favorites'

export default function FavoritesPage() {
  return (
    <>
      <div
        className={`${styles.recipesContainer} scroll scroll--left scroll__thin`}
      >
        <Favorites />
      </div>
      <div className={styles.rightbar}>
        <ListViewChanger />
      </div>
    </>
  )
}
