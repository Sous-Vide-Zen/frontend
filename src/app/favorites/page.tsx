'use client'

import styles from './favorites.module.scss'
import { useAppSelector } from '@/store/features/hooks'
import { useRecipes } from '@/hooks/useRecipes'
import ListViewChanger from '@/components/ui/ListViewChanger/ListViewChanger'
import RecipeList from '@/components/ui/RecipeList/RecipeList'

export default function Favorites() {
  const { view } = useAppSelector((state) => state.userSettings)

  return (
    <>
      <div
        className={`${styles.recipesContainer} scroll scroll--left scroll__thin`}
      >
        {/* div нужен для предотвращения зеркалирования компонента (если есть скрол слева у parent) при ошибке загрузки с сервера */}
        <div>
          <RecipeList
            dispatcher={useRecipes(
              'recipe/favorites',
              {},
              {
                refetchOnMountOrArgChange: true, // выключение кэширования результата запроса
              },
            )}
            view={view}
          />
        </div>
      </div>
      <div className={styles.rightbar}>
        <ListViewChanger />
      </div>
    </>
  )
}
