import { authBaseQuery } from '@/services/apiQueries'
import { createApi, FetchArgs, retry } from '@reduxjs/toolkit/query/react'
import { GetRecipeReactionsResult } from './reactions.types'

const staggeredAuthBaseQuery = retry(
  async (args: FetchArgs, api, extraOptions) => {
    const result = await authBaseQuery(args, api, extraOptions)

    if (result.error?.status === 401) {
      retry.fail(result.error)
    }

    return result
  },
  {
    maxRetries: 5,
  },
)

export const recipeReactionsApi = createApi({
  reducerPath: 'recipeReactionsApi',
  baseQuery: staggeredAuthBaseQuery,
  endpoints: (builder) => ({
    getRecipeReactions: builder.query<GetRecipeReactionsResult, string>({
      query: (slug) => ({ url: `recipe/${slug}/reactions/` }),
      extraOptions: { maxRetries: 5 },
    }),

    // example using queryFn
    getRecipeReactions2: builder.query<GetRecipeReactionsResult, string>({
      // @ts-ignore
      queryFn: async (arg, _queryApi, _extraOptions, baseQuery) => {
        console.log({ arg })

        const reactions = await baseQuery({
          url: `recipe1/${arg}/reactions/`,
          method: 'GET',
        })
        console.log({ reactions })
        return reactions
      },
    }),
  }),
})

export const { useGetRecipeReactionsQuery, useLazyGetRecipeReactionsQuery } =
  recipeReactionsApi
