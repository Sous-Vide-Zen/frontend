import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { makeStore } from '@/store/store'
import { BASE_URL } from '@/store/apiQueries'
import { recipeApi } from './recipes.actions'

/**
 * нужно для доступности 'window' и пр. внутри тестов
 * @vitest-environment jsdom
 */

const { getRecipes, getFavorites, addToFavorites, removeFromFavorites } =
  recipeApi.endpoints

const apiStore = makeStore()

const mocks = {
  getRecipes: {
    pathname: 'feed',
    params: {},
    result: [],
  },
  getFavorites: {
    pathname: 'recipe/favorites',
    params: {},
    result: [],
  },
  addToFavorites: {
    slug: 'test-recipe',
    result: {
      detail: 'Рецепт добавлен в избранное.',
    },
  },
  removeFromFavorites: {
    slug: 'test-recipe',
  },
}

export const restHandlers = [
  // getRecipes
  http.get(`${BASE_URL}${mocks.getRecipes.pathname}`, () => {
    return HttpResponse.json({
      data: mocks.getRecipes.result,
      error: undefined,
    })
  }),
  // getFavorites
  http.get(`${BASE_URL}${mocks.getFavorites.pathname}`, () => {
    return HttpResponse.json({
      data: mocks.getFavorites.result,
      error: undefined,
    })
  }),
  // addToFavorites
  http.post(`${BASE_URL}recipe/${mocks.addToFavorites.slug}/favorite`, () => {
    return new HttpResponse(JSON.stringify(mocks.addToFavorites.result), {
      status: 201,
    })
  }),
  // removeFromFavorites
  http.delete(
    `${BASE_URL}recipe/${mocks.removeFromFavorites.slug}/favorite`,
    () => {
      return new HttpResponse(null, {
        status: 204,
      })
    },
  ),
]

const server = setupServer(...restHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => server.close())

afterEach(() => server.resetHandlers())

describe('recipeApi', () => {
  it('should have the correct endpoints', () => {
    const endpoints = recipeApi.endpoints

    expect(endpoints.getRecipes).toBeDefined()
    expect(endpoints.getFavorites).toBeDefined()
    expect(endpoints.addToFavorites).toBeDefined()
    expect(endpoints.removeFromFavorites).toBeDefined()
  })

  it('should fetch recipes', async () => {
    const result = await apiStore.dispatch(
      getRecipes.initiate({
        pathname: mocks.getRecipes.pathname,
        params: mocks.getRecipes.params,
      }),
    )

    expect(result.data).toBeDefined()
    expect(result.error).toBeUndefined()
  })

  it('should fetch favorites', async () => {
    const result = await apiStore.dispatch(
      getFavorites.initiate({
        pathname: mocks.getFavorites.pathname,
        params: mocks.getFavorites.params,
      }),
    )
    expect(result.data).toBeDefined()
    expect(result.error).toBeUndefined()
  })

  it('should add a recipe to favorites', async () => {
    const result = await apiStore.dispatch(
      addToFavorites.initiate(mocks.addToFavorites.slug),
    )
    // @ts-ignore
    expect(result.data.detail).toBe(mocks.addToFavorites.result.detail)
  })

  it('should remove a recipe from favorites', async () => {
    const result = await apiStore.dispatch(
      removeFromFavorites.initiate(mocks.removeFromFavorites.slug),
    )
    expect(result).toBeDefined()
  })
})
