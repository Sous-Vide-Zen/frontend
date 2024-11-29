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

const prefix = `${BASE_URL}user/`

export const restHandlers = [
  // getUsers
  http.get(`${BASE_URL}users/`, () => {
    return HttpResponse.json({
      data: mocks.getUsers.result,
      error: undefined,
    })
  }),
  // getUserData
  http.get(`${prefix}${mocks.getUserData.username}`, () => {
    return HttpResponse.json(mocks.getUserData.result)
  }),
  // patchUserData
  http.patch(`${prefix}${mocks.patchUserData.username}`, () => {
    return HttpResponse.json(mocks.patchUserData.result)
  }),
  // deleteUser
  http.delete(`${prefix}${mocks.deleteUser.username}`, () => {
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
    const result = await apiStore.dispatch<any>(getUsers.initiate())
    const { data } = result.data

    expect(data).toBeDefined()
    expect(data.length).toBe(2)
  })

  it('should fetch user data', async () => {
    const result = await apiStore.dispatch<any>(
      getUserData.initiate(mocks.getUserData.username),
    )
    expect(result.data?.username).toBe(mocks.getUserData.result.username)
  })

  it('should patch user data', async () => {
    const result = await apiStore.dispatch<any>(
      patchUserData.initiate({
        userName: mocks.patchUserData.username,
        body: mocks.patchUserData.reqquestBody,
      }),
    )
    expect(result.data.phone).toBe(mocks.patchUserData.result.phone)
  })

  it('should delete user', async () => {
    const result = await apiStore.dispatch<any>(
      deleteUser.initiate(mocks.deleteUser.username),
    )

    expect(result.data).toBeNull()
  })
})
