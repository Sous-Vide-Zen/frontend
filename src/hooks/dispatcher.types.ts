import { getRecipesParams } from '@/store/features/feedAndFavorites/feedAndFavorites.actions'
import { FetchListData } from '@/store/features/feedAndFavorites/feedAndFavorites.types'
import { RecipeFeed } from '@/store/features/feedAndFavorites/feedAndFavorites.types'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { MutableRefObject } from 'react'

export type RecipeListOrdering = 'default' | 'top' | 'subscribe'

export type RecipeListResult = {
  isLoading: boolean
  isFetching?: boolean
  status?: QueryStatus
  error: any
  fetchData?: FetchListData
  recipies?: RecipeFeed[]
  loadNextPageRef: MutableRefObject<() => void>
  total?: number
}

export type RecipeListDispatcher = (
  params?: getRecipesParams,
) => RecipeListResult
