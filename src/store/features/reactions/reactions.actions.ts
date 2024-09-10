import { axiosBaseQuery } from '@/services/auth/auth.service'
import { createApi, retry } from '@reduxjs/toolkit/query/react'
import { GetRecipeReactionsResult } from './reactions.types'

const staggeredAxiosBaseQuery = retry(axiosBaseQuery, {
  maxRetries: 5,
})

export const recipeReactionsApi = createApi({
  reducerPath: 'recipeReactionsApi',
  baseQuery: staggeredAxiosBaseQuery,
  endpoints: (builder) => ({
    getRecipeReactions: builder.query<GetRecipeReactionsResult, string>({
      query: (slug) => ({ url: `recipe/${slug}/reactions/` }),
    }),
  }),
})

export const { useGetRecipeReactionsQuery, useLazyGetRecipeReactionsQuery } =
  recipeReactionsApi
