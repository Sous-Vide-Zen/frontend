import { useEffect, useRef } from 'react'

import {
  getRecipesParams,
  useGetRecipesQuery,
  useLazyGetRecipesQuery,
} from '@/store/features/recipes/recipes.actions'
import { getParamObjectFromURL } from '@/helpers/url'
import { RecipeListDispatcher, RecipeListResult } from './dispatcher.types'

export const getUseRecipes = (
  pathname: string,
  params: Record<string, string> = {},
) => {
  const useMyRecipies: RecipeListDispatcher = () => {
    const { data, isFetching, isLoading, error, status } = useGetRecipesQuery({
      pathname,
      params,
    })
    const [trigger] = useLazyGetRecipesQuery()

    const loadNextPageRef = useRef(() => {})

    useEffect(() => {
      loadNextPageRef.current = () => {
        if (data?.next) {
          trigger({
            pathname,
            params: getParamObjectFromURL(data?.next),
          })
        }
      }
    }, [data?.next, trigger])

    return {
      isLoading,
      isFetching,
      status,
      error,
      fetchData: data,
      recipies: data?.results,
      loadNextPageRef,
    }
  }

  return useMyRecipies
}

export const useRecipes = (pathname: string, params: getRecipesParams): RecipeListResult => {
  const { data, isFetching, isLoading, error, status } = useGetRecipesQuery({
    pathname,
    params: params ?? {},
  })
  const [trigger] = useLazyGetRecipesQuery()
  const loadNextPageRef = useRef(() => {})

  useEffect(() => {
    loadNextPageRef.current = () => {
      if (data?.next) {
        let url = new URL(data?.next ?? '')
        const page = url ? String(url.searchParams.get('page')) : '0'
        // eslint-disable-next-line react-hooks/exhaustive-deps
        params = { ...params, page }
        console.log({ page, params })

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
    recipies: data?.results,
    loadNextPageRef,
  }
}
