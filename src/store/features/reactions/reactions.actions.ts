import { axiosBaseQuery } from '@/services/auth/auth.service'
import { createApi } from '@reduxjs/toolkit/query/react'
import { GetRecipeReactionsResult } from './reactions.types'

export const recipeReactionsApi = createApi({
  reducerPath: 'recipeReactionsApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getRecipeReactions: builder.query<GetRecipeReactionsResult, string>({
      query: (slug) => ({ url: `recipe/${slug}/reactions/` }),
    }),
  }),
})

export const { useGetRecipeReactionsQuery, useLazyGetRecipeReactionsQuery } =
  recipeReactionsApi
