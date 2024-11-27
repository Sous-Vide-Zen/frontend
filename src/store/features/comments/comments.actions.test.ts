import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { BASE_URL } from '@/store/apiQueries'
import { makeStore } from '@/store/store'
import { commentsApi } from './comments.actions'
import { commentsMocks as mocks } from './comments.actions.mocks'

/**
 * нужно для доступности 'window' и пр. внутри тестов
 * @vitest-environment jsdom
 */

const {
  getRecipeComments,
  addRecipeComment,
  updateRecipeComment,
  deleteRecipeComment,
} = commentsApi.endpoints

const apiStore = makeStore()

export const restHandlers = [
  // getRecipeComments
  http.get(
    `${BASE_URL}recipe/${mocks.getRecipeComments.recipeId}/comments/`,
    () => HttpResponse.json(mocks.getRecipeComments.response),
  ),
  // addRecipeComment
  http.post(
    `${BASE_URL}recipe/${mocks.addRecipeComment.params.recipeId}/comments/`,
    () => HttpResponse.json(mocks.addRecipeComment.response),
  ),
  // updateRecipeComment
  http.put(
    `${BASE_URL}recipe/${mocks.updateRecipeComment.params.recipeId}/comments/${mocks.updateRecipeComment.params.commentId}/`,
    () => HttpResponse.json(mocks.updateRecipeComment.response),
  ),
  // deleteRecipeComment
  http.delete(
    `${BASE_URL}recipe/${mocks.deleteRecipeComment.params.recipeId}/comments/${mocks.deleteRecipeComment.params.commentId}/`,
    () => HttpResponse.json(mocks.deleteRecipeComment.response),
  ),
]

const server = setupServer(...restHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => server.close())

afterEach(() => server.resetHandlers())

describe('subscribeApi', () => {
  it('should have the correct endpoints', () => {
    const endpoints = commentsApi.endpoints

    expect(endpoints.getRecipeComments).toBeDefined()
    expect(endpoints.addRecipeComment).toBeDefined()
    expect(endpoints.updateRecipeComment).toBeDefined()
    expect(endpoints.deleteRecipeComment).toBeDefined()
  })

  it('should fetch recipe comments', async () => {
    const result = await apiStore.dispatch<any>(
      getRecipeComments.initiate(mocks.getRecipeComments.recipeId),
    )

    expect(result?.data?.results).toBeDefined()
    expect(result.data.results[0].id).toBe(
      mocks.getRecipeComments.response.results[0].id,
    )
  })

  it('should add recipe comment', async () => {
    const result = await apiStore.dispatch<any>(
      addRecipeComment.initiate({ ...mocks.addRecipeComment.params }),
    )

    expect(result?.data).toBeDefined()
    expect(result.data.id).toBe(mocks.addRecipeComment.response.id)
  })

  it('should update recipe comment', async () => {
    const result = await apiStore.dispatch<any>(
      updateRecipeComment.initiate({ ...mocks.updateRecipeComment.params }),
    )

    expect(result?.data).toBeDefined()
    expect(result.data.id).toBe(mocks.updateRecipeComment.response.id)
  })

  it('should sunubscribe', async () => {
    const result = await apiStore.dispatch<any>(
      deleteRecipeComment.initiate({ ...mocks.deleteRecipeComment.params }),
    )

    expect(result?.data).toBeDefined()
    expect(result.data.message).toBe(mocks.deleteRecipeComment.response.message)
  })
})
