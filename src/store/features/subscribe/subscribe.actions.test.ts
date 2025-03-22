import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { BASE_URL } from '@/store/apiQueries'
import { makeStore } from '@/store/store'
import { subscribeApi } from './subscribe.actions'
import { SubscribeResponse, SubscribtionsResponse } from './subscribe.types'

/**
 * нужно для доступности 'window' и пр. внутри тестов
 * @vitest-environment jsdom
 */

const { getUserSubscribers, getUserSubscriptions, subscribe, unsubscribe } =
  subscribeApi.endpoints

const apiStore = makeStore()

const mocks = {
  getUserSubscriptions: {
    username: 'test',
    response: {
      count: 1,
      next: '',
      previous: '',
      results: [
        {
          id: 1,
          author: {
            id: 228,
            username: 'admin',
            bio: 'Привет, я Вася, и я профессиональный...',
          },
          subscribers_count: 1,
        },
        {
          id: 2,
          author: {
            id: 2,
            username: 'Vasya',
            avatar: 'path/to/avatar.webp',
          },
          subscribers_count: 0,
        },
      ],
    } satisfies SubscribtionsResponse,
  },
  getUserSubscribers: {
    username: 'test',
    response: {
      count: 3,
      next: '',
      previous: '',
      results: [
        {
          id: 3,
          author: {
            id: 228,
            username: 'admin',
            bio: 'Привет, я Вася, и я профессиональный...',
          },
          subscribers_count: 1,
        },
        {
          id: 4,
          author: {
            id: 2,
            username: 'Vasya',
            avatar: 'path/to/avatar.webp',
          },
          subscribers_count: 1,
        },
      ],
    } satisfies SubscribtionsResponse,
  },
  subscribe: {
    message: 'Вы успешно подписались на автора',
  } satisfies SubscribeResponse,
  unsubscribe: {
    message: 'Вы успешно отписались от автора',
  } satisfies SubscribeResponse,
}

export const restHandlers = [
  // getUserSubscriptions
  http.get(
    `${BASE_URL}user/${mocks.getUserSubscriptions.username}/subscriptions/`,
    () => HttpResponse.json(mocks.getUserSubscriptions.response),
  ),
  // getUserSubscribers
  http.get(
    `${BASE_URL}user/${mocks.getUserSubscribers.username}/subscribers/`,
    () => HttpResponse.json(mocks.getUserSubscribers.response),
  ),
  // subscribe
  http.post(`${BASE_URL}subscribe/`, () => HttpResponse.json(mocks.subscribe)),
  // unsubscribe
  http.delete(`${BASE_URL}subscribe/`, () =>
    HttpResponse.json(mocks.unsubscribe),
  ),
]

const server = setupServer(...restHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => server.close())

afterEach(() => server.resetHandlers())

describe('subscribeApi', () => {
  it('should have the correct endpoints', () => {
    const endpoints = subscribeApi.endpoints

    expect(endpoints.getUserSubscriptions).toBeDefined()
    expect(endpoints.getUserSubscribers).toBeDefined()
    expect(endpoints.subscribe).toBeDefined()
    expect(endpoints.unsubscribe).toBeDefined()
  })

  it('should fetch user subscriptions', async () => {
    const result = await apiStore.dispatch<any>(
      getUserSubscriptions.initiate(mocks.getUserSubscriptions.username),
    )

    expect(result?.data?.results).toBeDefined()
    expect(result.data.results[0].author.id).toBe(
      mocks.getUserSubscriptions.response.results[0].author.id,
    )
  })

  it('should fetch user subscribers', async () => {
    const result = await apiStore.dispatch<any>(
      getUserSubscribers.initiate(mocks.getUserSubscribers.username),
    )

    expect(result?.data?.results).toBeDefined()
    expect(result.data.results[0].author.id).toBe(
      mocks.getUserSubscribers.response.results[0].author.id,
    )
  })

  it('should subscribe', async () => {
    const result = await apiStore.dispatch<any>(subscribe.initiate(''))

    expect(result.data.message).toBe(mocks.subscribe.message)
  })

  it('should sunubscribe', async () => {
    const result = await apiStore.dispatch<any>(unsubscribe.initiate(''))

    expect(result.data.message).toBe(mocks.unsubscribe.message)
  })
})
