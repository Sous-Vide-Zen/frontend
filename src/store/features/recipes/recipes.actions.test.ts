import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { makeStore } from '@/store/store'
import { BASE_URL } from '@/store/apiQueries'
import { recipeApi } from './recipes.actions'
import { ResipeDraftsElem } from './recipes.types'
import { recipeMocks as mocks } from './recipes.actions.mocks'

/**
 * нужно для доступности 'window' и пр. внутри тестов
 * @vitest-environment jsdom
 */

const {
  getRecipe,
  getRecipeDrafts,
  createRecipeDraft,
  updateRecipe,
  deleteRecipe,
  publicate,
} = recipeApi.endpoints

const apiStore = makeStore()

export const restHandlers = [
  // getRecipe
  http.get(`${BASE_URL}recipe/${mocks.getRecipe.slug}/`, () => {
    return HttpResponse.json(mocks.getRecipe.response)
  }),
  // getRecipeDrafts
  http.get(`${BASE_URL}recipe/drafts/`, () => {
    return HttpResponse.json(mocks.getRecipeDrafts)
  }),
  // createRecipeDraft
  http.post(`${BASE_URL}recipe/`, () => {
    return new HttpResponse(JSON.stringify(mocks.createRecipeDraft), {
      status: 201,
    })
  }),
  // updateRecipe
  http.patch(`${BASE_URL}recipe/${mocks.updateRecipe.params.slug}`, () => {
    return new HttpResponse(JSON.stringify(mocks.updateRecipe.response))
  }),
  // deleteRecipe
  http.delete(`${BASE_URL}recipe/${mocks.deleteRecipe.slug}`, () => {
    return new HttpResponse(JSON.stringify(mocks.deleteRecipe.response))
  }),
  // deleteRecipe
  http.post(
    `${BASE_URL}recipe/drafts/${mocks.publicate.params.slug}/publicate`,
    () => {
      return new HttpResponse(JSON.stringify(mocks.publicate.response))
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

    expect(endpoints.getRecipe).toBeDefined()
    expect(endpoints.getRecipeDrafts).toBeDefined()

    // expect(endpoints.updateRecipe).toBeDefined()
  })

  it('should fetch recipe', async () => {
    const result = await apiStore.dispatch(
      getRecipe.initiate(mocks.getRecipe.slug),
    )

    expect(result.data).toBeDefined()
    expect(result.data?.slug).toBe(mocks.getRecipe.response.slug)
  })

  it('should fetch recipe frafts', async () => {
    const result = await apiStore.dispatch(getRecipeDrafts.initiate())

    expect(result.data).toBeDefined()
    expect(result.data?.length).toBe(2)
    const data: ResipeDraftsElem = result.data![0]
    expect(data.id).toBe(mocks.getRecipeDrafts[0]['id'])
  })

  it('should create recipe drafts', async () => {
    const result = await apiStore.dispatch(createRecipeDraft.initiate())

    //@ts-ignore
    expect(result.data).toBeDefined()
    //@ts-ignore
    expect(result.data?.id).toBe(5)
  })

  it('should update recipe/draft', async () => {
    const result = await apiStore.dispatch(
      updateRecipe.initiate(mocks.updateRecipe.params),
    )

    //@ts-ignore
    expect(result.data).toBeDefined()
    //@ts-ignore
    expect(result.data?.id).toBe(11)
  })

  it('should delete recipe/draft', async () => {
    const result = await apiStore.dispatch(
      deleteRecipe.initiate(mocks.deleteRecipe.slug),
    )

    // @ts-ignore
    expect(result.data.message).toBe(mocks.deleteRecipe.response.message)
  })

  it('should publicate draft', async () => {
    const result = await apiStore.dispatch(
      publicate.initiate(mocks.publicate.params),
    )

    // @ts-ignore
    expect(result.data.message).toBe(mocks.publicate.response.message)
  })
})
