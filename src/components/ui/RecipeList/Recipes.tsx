'use client'

import { useAppSelector } from '@/store/hooks'
import { getRecipesParams } from '@/store/features/feedAndFavorites/feedAndFavorites.actions'
import { useRecipes } from '@/hooks/useRecipes'
import { RecipeList } from '@/components/ui/RecipeList'

export default function Recipes() {
  const { view, sort } = useAppSelector((state) => state.userSettings)
  const params: getRecipesParams = {}

  switch (sort) {
    case 'top':
      params.ordering = '-activity_count'
      break
    case 'subscribe':
      params.filter = 'subscribe'
      break
  }

  return (
    // div нужен для предотвращения зеркалирования компонента (если есть скрол слева у parent) при ошибке загрузки с сервера
    <div>
      <RecipeList dispatcher={useRecipes('feed', params)} view={view} />
    </div>
  )
}
