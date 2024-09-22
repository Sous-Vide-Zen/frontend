'use client'

import { useAppSelector } from '@/store/hooks'
import { useRecipes } from '@/hooks/useRecipes'
import RecipeList from '@/components/ui/RecipeList/RecipeList'

export default function Recipes() {
  const { view, sort, filter } = useAppSelector((state) => state.userSettings)
  const ordering = sort === 'top' ? '-activity_count' : undefined

  return (
    // div нужен для предотвращения зеркалирования компонента (если есть скрол слева у parent) при ошибке загрузки с сервера
    <div>
      <RecipeList
        dispatcher={useRecipes('feed', { ordering, filter })}
        view={view}
      />
    </div>
  )
}
