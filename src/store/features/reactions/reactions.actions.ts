import { GetRecipeReactionsResult } from './reactions.types'
import { mainApi } from '@/store/api'

export const recipeReactionsApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecipeReactions: builder.query<GetRecipeReactionsResult, string>({
      query: (slug) => ({ url: `recipe/${slug}/reactions/` }),
      extraOptions: { maxRetries: 8 },
    }),

    // example using queryFn
    // getRecipeReactions2: builder.query<GetRecipeReactionsResult, string>({
    //   // @ts-ignore
    //   queryFn: async (arg, _queryApi, _extraOptions, baseQuery) => {
    //     console.log({ arg })

    //     const reactions = await baseQuery({
    //       url: `recipe1/${arg}/reactions/`,
    //       method: 'GET',
    //     })
    //     console.log({ reactions })
    //     return reactions
    //   },
    // }),
  }),
})

export const { useGetRecipeReactionsQuery, useLazyGetRecipeReactionsQuery } =
  recipeReactionsApi
