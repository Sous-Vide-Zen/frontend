import { useLazyGetRecipeDraftsQuery } from '@/store/features/recipes/recipes.actions'
import { useAuth } from './useAuth'

export const useDrafts = () => {
  const { isAuth } = useAuth()

  const [load, { data: drafts, status, error }] = useLazyGetRecipeDraftsQuery()

  const loadDrafts = () => {
    isAuth && load()
  }

  return {
    loadDrafts,
    drafts,
    status,
    error,
  }
}
