import { getRecipesParams } from '@/store/features/recipes/recipes.actions'
import { IFetchListData, IRecipe } from '@/store/features/recipes/recipes.types'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { MutableRefObject } from 'react'

export type RecipeListOrdering = 'default' | 'top'

export type RecipeListFilter = 'subscribe'

export type RecipeListResult = {
  isLoading: boolean
  isFetching?: boolean
  status?: QueryStatus
  error: any
  fetchData?: IFetchListData
  recipies?: IRecipe[]
  loadNextPageRef: MutableRefObject<() => void>
}

export type RecipeListDispatcher = (
  params?: getRecipesParams,
) => RecipeListResult
