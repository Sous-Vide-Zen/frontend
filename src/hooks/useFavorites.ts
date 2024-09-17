import { useEffect, useRef } from 'react'

import {
  getRecipesParams,
  useGetFavoritesQuery,
  useLazyGetFavoritesQuery,
} from '@/store/features/recipes/recipes.actions'
import { RecipeListResult } from './dispatcher.types'
import { IRecipe } from '@/store/features/recipes/recipes.types'

export const useFavorites = (
  pathname: string,
  params: getRecipesParams,
  options?: {
    refetchOnMountOrArgChange?: boolean | number
  },
): RecipeListResult => {
  const { data, isFetching, isLoading, error, status } = useGetFavoritesQuery(
    {
      pathname,
      params: params ?? {},
    },
    options,
  )
  const [trigger] = useLazyGetFavoritesQuery()
  const loadNextPageRef = useRef(() => {})

  useEffect(() => {
    loadNextPageRef.current = () => {
      if (data?.next) {
        let url = new URL(data?.next ?? '')
        const page = url ? String(url.searchParams.get('page')) : '0'
        // eslint-disable-next-line react-hooks/exhaustive-deps
        params = { ...params, page }

        trigger({
          pathname,
          params,
        })
      }
    }
  }, [data, data?.next, trigger])

  return {
    isLoading,
    isFetching,
    status,
    error,
    fetchData: data,
    recipies: data?.results.map((e: IRecipe) => ({ ...e, is_favorite: true })),
    loadNextPageRef,
  }
}
