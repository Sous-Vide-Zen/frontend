'use client'

import { useAppSelector } from '@/store/features/hooks'
import { useFavorites } from '@/hooks/useFavorites'
import RecipeList from '@/components/ui/RecipeList/RecipeList'

export default function Favorites() {
  const { view } = useAppSelector((state) => state.userSettings)

  return (
    // div нужен для предотвращения зеркалирования компонента (если есть скрол слева у parent) при ошибке загрузки с сервера
    <div>
      <RecipeList
        dispatcher={useFavorites('recipe/favorites', {})}
        view={view}
      />
    </div>
  )
}
