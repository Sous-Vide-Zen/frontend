import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { BASE_URL } from '@/store/apiQueries'
import { makeStore } from '@/store/store'
import { userApi } from './user.actions'
import { userMocks as mocks } from './user.actions.mocks'

/**
 * нужно для доступности 'window' и пр. внутри тестов
 * @vitest-environment jsdom
 */

const { getUsers, getUserData, patchUserData, deleteUser } = userApi.endpoints

const apiStore = makeStore()

export const restHandlers = [
  // getUsers
  http.get(`${BASE_URL}users/`, () => {
    return HttpResponse.json({
      data: mocks.getUsers.result,
      error: undefined,
    })
  }),
  // getUserData
  http.get(`${BASE_URL}user/${mocks.getUserData.username}`, () => {
    return HttpResponse.json({
      data: mocks.getUserData.result,
      error: undefined,
    })
  }),
  // patchUserData
  http.patch(`${BASE_URL}user/${mocks.patchUserData.username}`, () => {
    return HttpResponse.json({
      data: mocks.patchUserData.result,
      error: undefined,
    })
  }),
  // deleteUser
  http.delete(`${BASE_URL}user/${mocks.deleteUser.username}`, () => {
    return new HttpResponse(null, {
      status: 204,
    })
  }),
]

const server = setupServer(...restHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => server.close())

afterEach(() => server.resetHandlers())

describe('userApi', () => {
  it('should have the correct endpoints', () => {
    const endpoints = userApi.endpoints

    expect(endpoints.getUsers).toBeDefined()
    expect(endpoints.getUserData).toBeDefined()
    expect(endpoints.patchUserData).toBeDefined()
    expect(endpoints.deleteUser).toBeDefined()
  })

  it('should fetch users', async () => {
    const result = await apiStore.dispatch(getUsers.initiate())
    // @ts-ignore
    const { data } = result.data

    expect(data).toBeDefined()
    expect(data.length).toBe(2)
  })

  it('should fetch user data', async () => {
    const result = await apiStore.dispatch(
      getUserData.initiate(mocks.getUserData.username),
    )
    // @ts-ignore
    const { data } = result.data
    expect(data).toBeDefined()
    expect(data.username).toBe('user1')
  })

  it('should patch user data', async () => {
    const result = await apiStore.dispatch(
      patchUserData.initiate({
        userName: mocks.patchUserData.username,
        body: mocks.patchUserData.reqquestBody,
      }),
    )
    // @ts-ignore
    const { data } = result.data
    expect(data).toBeDefined()
    expect(data.phone).toBe('+79261112233')
  })

  it('should delete user', async () => {
    const result = await apiStore.dispatch(
      deleteUser.initiate(mocks.deleteUser.username),
    )
    // @ts-ignore
    expect(result.data).toBeNull() // Add your specific assertions here
  })
})
