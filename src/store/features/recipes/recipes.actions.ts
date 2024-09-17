import { createApi } from '@reduxjs/toolkit/query/react'
import { Action, current, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { authBaseQuery } from '@/services/apiQueries'
import { convertObjectToQueryParams } from '@/helpers/url'
import {
  IFetchListData,
  IPatchRecipeParams,
  IRecipeWithIngredients,
} from './recipes.types'
import { REHYDRATE } from 'redux-persist'

export type ListParams = {
  pathname: string
  params: getRecipesParams
}

export type getRecipesParams = {
  filter?: string | null
  ordering?: string
  page?: string
  username?: string
}

/*
  получилась замороченная конструкция. Надо периодически иметь возможность изменения в кеше результатов запросов, 
  но в RTK для этого надо точно знать название запроса и все параметры, что сложно реализуемо.
  Может быть стоит сделать еще один слой - передавать в хранилие результаты запросов, и уже там делать с ними что угодно,
  но будет проблема избавления от дублей, что тоже сложно...
  Или вернуться к старому варианту запросов через Thunk, и там тоже будет проблема избавления от дублей.

  Надо придумать более грамотное решение.
*/

// массив со всеми вариантами параметров для запроса getList. Необходим для правки кеша при изменении даннных рецептов
//todo:  это реализовано неправильно - надо сделать отдельный список избранного в слайсе и добавлть/удалять его в/из общего списка
const getListParamsVariants: ListParams[] = [
  { pathname: 'feed', params: { ordering: '-activity_count' } },
  { pathname: 'feed', params: {} },
  { pathname: 'feed', params: { filter: 'subscriptions' } },
  { pathname: 'feed', params: { username: 'Vasya' } }, //todo - тут надо как то динамически пробрасывать параметры ;-(
]

type RootState = any

// function isHydrateAction1(action: Action): action is PayloadAction<RootState> {
//   return action.type === HYDRATE
// }

function isRehydrateAction(action: Action): action is Action<
  typeof REHYDRATE
> & {
  key: string
  payload: RootState
  err: unknown
} {
  return action.type === REHYDRATE
}

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: authBaseQuery,
  tagTypes: ['Recipes', 'Favorites'],
  extractRehydrationInfo(action, { reducerPath }): any {
    // WIP: тут надо отловить гадратированные данные и выдать их вместо реального запроса
    // console.log({ t: action.type, r: REHYDRATE })
    // if (isRehydrateAction(action)) {
    //   console.log('=====isHydrateAction', action)
    //   // // if (action.type === HYDRATE) {
    //   //   return action.payload[reducerPath]
    // }
    // if (action.type === 'recipeApi/executeQuery/fulfilled') {
    //   console.log({ i: REHYDRATE, a: action.type, p: action.payload, action })
    // }
    // if (isHydrateAction(action)) {
    //   // console.log({ i: isHydrateAction(action), a: action.type, p: recipeApi.reducerPath, action })
    //   if (action.key === 'key used with redux-persist') {
    //     return action.payload
    //   }
    //   // When persisting the root reducer
    //   // return action.payload[recipeApi.reducerPath]
    // }
  },
  endpoints: (builder) => ({
    // Единый запрос для разных списков рецептов
    getRecipes: builder.query<IFetchListData, ListParams>({
      query: ({ pathname, params }) => {
        const fixedParams = params as Record<string, string>
        // console.log(
        //   'url',
        //   `${pathname}/?${convertObjectToQueryParams(fixedParams)}`,
        // )

        return {
          url: `${pathname}/?${convertObjectToQueryParams(fixedParams)}`,
          method: 'GET',
          providesTags: ['Recipes'],
        }
      },
      serializeQueryArgs: ({ queryArgs }) => {
        const newQueryArgs = { ...queryArgs.params }
        if (newQueryArgs.page) {
          delete newQueryArgs.page
        }
        return newQueryArgs
      },
      merge: (currentCache, newItems) => {
        if (currentCache.results) {
          return {
            ...currentCache,
            ...newItems,
            results: [...currentCache.results, ...newItems.results],
          }
        }
        return newItems
      },
    }),

    // кэш сохраняется 1 сек
    // пришлось добавить, потому что необходимо добавлять в результат запроса поле 'is_favorite: true' для корректного отображения
    getFavorites: builder.query<IFetchListData, ListParams>({
      keepUnusedDataFor: 1,
      query: ({ pathname, params }) => {
        const fixedParams = params as Record<string, string>
        return {
          url: `${pathname}/?${convertObjectToQueryParams(fixedParams)}`,
          method: 'GET',
          providesTags: ['Favorites'],
        }
      },
      serializeQueryArgs: ({ queryArgs }) => {
        const newQueryArgs = { ...queryArgs.params }
        if (newQueryArgs.page) {
          delete newQueryArgs.page
        }
        return newQueryArgs
      },
      merge: (currentCache, newItems) => {
        if (currentCache.results) {
          const fixedResults = newItems.results.map((e) => ({
            ...e,
            is_favorite: true,
          }))
          return {
            ...currentCache,
            ...newItems,
            results: [...currentCache.results, ...fixedResults],
          }
        }
        return newItems
      },
    }),

    addToFavorites: builder.mutation<void, string>({
      query: (slug) => ({
        url: `recipe/${slug}/favorite/`,
        method: 'POST',
      }),
      invalidatesTags: ['Recipes'], //todo не работает(
      async onQueryStarted(slug, { dispatch, queryFulfilled }) {
        await queryFulfilled

        //todo  правим кэш для избранного - чистить полностью как вариант, но не работает(
        // dispatch(
        //   recipeApi.util.updateQueryData(
        //     'getFavorites',
        //     {
        //       pathname: 'recipe/favorites',
        //       params: {},
        //     },
        //     (draft) => {
        //       const currentDraft = current(draft)
        //       const results: IRecipe[] = []
        //       Object.assign(draft, { ...currentDraft, results })
        //     },
        //   ),
        // )

        // правим кэш для всех запросов списка рецептов
        getListParamsVariants.forEach(({ pathname, params }) => {
          dispatch(
            recipeApi.util.updateQueryData(
              'getRecipes',
              {
                pathname,
                params,
              },
              (draft) => {
                const currentDraft = current(draft)
                const results = currentDraft.results.map((e) =>
                  e.slug === slug ? { ...e, is_favorite: true } : e,
                )
                Object.assign(draft, { ...currentDraft, results })
              },
            ),
          )
        })
      },
    }),

    removeFromFavorites: builder.mutation<void, string>({
      query: (slug) => ({
        url: `recipe/${slug}/favorite/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recipes'], //todo не работает(
      async onQueryStarted(slug, { dispatch, queryFulfilled }) {
        await queryFulfilled

        // правим кэш для избранного
        dispatch(
          recipeApi.util.updateQueryData(
            'getFavorites',
            {
              pathname: 'recipe/favorites',
              params: {},
            },
            (draft) => {
              const currentDraft = current(draft)
              const results = currentDraft.results.filter(
                (e) => e.slug !== slug,
              )
              Object.assign(draft, { ...currentDraft, results })
            },
          ),
        )

        // правим кэш для всех запросов списка рецептов
        getListParamsVariants.forEach(({ pathname, params }) => {
          dispatch(
            recipeApi.util.updateQueryData(
              'getRecipes',
              {
                pathname,
                params,
              },
              (draft) => {
                const currentDraft = current(draft)
                const results = currentDraft.results.map((e) =>
                  e.slug === slug ? { ...e, is_favorite: false } : e,
                )
                Object.assign(draft, { ...currentDraft, results })
              },
            ),
          )
        })
      },
    }),

    getRecipe: builder.query<IRecipeWithIngredients, string>({
      query: (slug) => {
        return {
          url: `recipe/${slug}/`,
          method: 'GET',
        }
      },
    }),

    saveRecipe: builder.mutation<any, IPatchRecipeParams>({
      query: ({ slug, data }) => {
        return {
          url: `recipe/${slug}/`,
          method: 'PATCH',
          data,
        }
      },
    }),

    createRecipe: builder.mutation<any, IPatchRecipeParams>({
      query: ({ slug, data: body }) => {
        return {
          url: `recipe/${slug}/`,
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const {
  useGetRecipesQuery,
  useLazyGetRecipesQuery,
  useGetFavoritesQuery,
  useLazyGetFavoritesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
  useGetRecipeQuery,
  useSaveRecipeMutation,
  useCreateRecipeMutation,
} = recipeApi

// export endpoints for use in SSR
export const { getRecipes } = recipeApi.endpoints
