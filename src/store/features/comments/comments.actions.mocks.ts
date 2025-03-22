import {
  CreateCommenResponse,
  CreateCommentBody,
  RecipeCommentsResponse,
  RemoveCommentResponse,
} from './comments.types'

export const commentsMocks = {
  getRecipeComments: {
    slug: 'test',
    recipeId: 1,
    response: {
      count: 25,
      next: '',
      results: [
        {
          id: 1,
          author: {
            id: 1,
            username: 'user1',
            display_name: 'User 1',
            avatar: 'path/to/avatar.jpg',
          },
          text: 'This is a great recipe!',
          pub_date: '2023-03-15T12:00:00Z',
          updated_date: '2023-03-15T12:00:00Z',
        },
      ],
    } satisfies RecipeCommentsResponse,
  },
  addRecipeComment: {
    params: {
      recipeId: 1,
      text: 'Your comment text',
    } satisfies CreateCommentBody & { recipeId: number },
    response: {
      id: 3,
      author: {
        id: 1,
        username: 'user1',
        display_name: 'User 1',
        avatar: 'path/to/avatar.jpg',
      },
      text: 'Your comment text',
      pub_date: '2023-03-15T12:10:00Z',
      updated_date: '2023-03-15T12:10:00Z',
    } satisfies CreateCommenResponse,
  },
  updateRecipeComment: {
    params: {
      recipeId: 1,
      commentId: 3,
      text: 'Updated comment text',
    } satisfies CreateCommentBody & { recipeId: number; commentId: number },
    response: {
      id: 3,
      author: {
        id: 1,
        username: 'user1',
        display_name: 'User 1',
        avatar: 'path/to/avatar.jpg',
      },
      text: 'Your comment text',
      pub_date: '2023-03-15T12:10:00Z',
      updated_date: '2023-03-15T12:10:00Z',
    } satisfies CreateCommenResponse,
  },
  deleteRecipeComment: {
    params: {
      recipeId: 1,
      commentId: 3,
    } satisfies { recipeId: number; commentId: number },
    response: {
      message: 'Комментарий удален!',
    } satisfies RemoveCommentResponse,
  },
}
