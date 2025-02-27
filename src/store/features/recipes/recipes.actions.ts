import { mainApi } from '@/store/api'
import {
  PatchRecipe,
  PublicateRecipe,
  RecipeFull,
  ResipeDraftsElem,
} from './recipes.types'
import { RemoveRecipeResponse } from '../common.types'

export const recipeApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecipe: builder.query<RecipeFull, string>({
      query: (slug) => {
        return {
          url: `recipe/${slug}/`,
          method: 'GET',
        }
      },
    }),

    getRecipeDrafts: builder.query<ResipeDraftsElem[], void>({
      query: () => {
        return {
          url: `recipe/drafts/`,
          method: 'GET',
        }
      },
    }),

    createRecipeDraft: builder.mutation<ResipeDraftsElem, void>({
      query: () => {
        return {
          url: `recipe/`,
          method: 'POST',
        }
      },
    }),

    updateRecipe: builder.mutation<RecipeFull, PatchRecipe>({
      query: ({ slug, data: body }) => {
        console.log('RTQ PATCH', body)
        return {
          url: `recipe/${slug}/`,
          method: 'PATCH',
          body,
        }
      },
    }),
    deleteRecipe: builder.mutation<RemoveRecipeResponse, string>({
      query: (slug) => {
        return {
          url: `recipe/${slug}/`,
          method: 'DELETE',
        }
      },
    }),

    publicate: builder.mutation<RecipeFull, PublicateRecipe>({
      query: ({ slug, data: body }) => {
        console.log('RTQ publicate', body)
        return {
          url: `recipe/drafts/${slug}/publicate/`,
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const {
  useGetRecipeQuery,
  useGetRecipeDraftsQuery,
  useCreateRecipeDraftMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  usePublicateMutation,
} = recipeApi
