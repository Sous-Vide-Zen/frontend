import { mainApi } from '@/store/api'
import {
  CreateCommenResponse,
  CreateCommentBody,
  RecipeCommentsResponse,
  RemoveCommentResponse,
} from './comments.types'

export const commentsApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecipeComments: builder.query<RecipeCommentsResponse, number>({
      query: (recipeId) => ({ url: `recipe/${recipeId}/comments/` }),
    }),
    addRecipeComment: builder.query<
      CreateCommenResponse,
      CreateCommentBody & { recipeId: number }
    >({
      query: ({ recipeId, text, parent }) => ({
        url: `recipe/${recipeId}/comments/`,
        method: 'POST',
        body: { text, parent },
      }),
    }),
    updateRecipeComment: builder.query<
      CreateCommenResponse,
      CreateCommentBody & { recipeId: number; commentId: number }
    >({
      query: ({ recipeId, commentId, text, parent }) => ({
        url: `/recipe/${recipeId}/comments/${commentId}/`,
        method: 'PUT',
        body: { text, parent },
      }),
    }),
    deleteRecipeComment: builder.query<
      RemoveCommentResponse,
      { recipeId: number; commentId: number }
    >({
      query: ({ recipeId, commentId }) => ({
        url: `/recipe/${recipeId}/comments/${commentId}/`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetRecipeCommentsQuery,
  useLazyGetRecipeCommentsQuery,
  useAddRecipeCommentQuery,
  useLazyAddRecipeCommentQuery,
  useUpdateRecipeCommentQuery,
  useLazyUpdateRecipeCommentQuery,
  useDeleteRecipeCommentQuery,
  useLazyDeleteRecipeCommentQuery,
} = commentsApi
