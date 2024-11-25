import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { BASE_URL } from '@/store/apiQueries'
import { makeStore } from '@/store/store'
import { userApi } from './user.actions'

/**
 * нужно для доступности 'window' и пр. внутри тестов
 * @vitest-environment jsdom
 */

const { getUsers, getUserData, patchUserData, deleteUser } = userApi.endpoints

const apiStore = makeStore()

const mocks = {
  getUsers: {
    result: [
      {
        id: 1,
        username: 'user1',
        display_name: 'Вася Пупкин',
        avatar: 'http://127.0.0.1:8000/media/avatars/user_1/avatar.jpg',
        recipes_count: 1,
        is_follow: true,
        is_follower: false,
      },
      {
        id: 2,
        username: 'user2',
        display_name: 'Пупкин',
        avatar: 'http://127.0.0.1:8000/media/avatars/user_2/avatar.jpg',
        recipes_count: 2,
        is_follow: true,
        is_follower: false,
      },
    ],
  },
  getUserData: {
    username: 'test',
    result: {
      id: 1,
      username: 'user1',
      display_name: 'Светлана',
      email: 'vasya_pupkin@example.com',
      avatar: 'path/to/avatar.jpg',
      city: 'Москва',
      country: 'Россия',
      bio: 'Описание пользователя',
      date_joined: '2022-01-01',
      first_name: 'Василий',
      last_name: 'Иванов',
      is_active: true,
      is_banned: false,
      is_staff: false,
      is_admin: false,
    },
  },
  patchUserData: {
    username: 'test',
    reqquestBody: {
      display_name: 'string',
      phone: '+79261112233',
      date_joined: '2024-03-05T14:23:27.430Z',
      country: 'string',
      city: 'string',
      first_name: 'string',
      last_name: 'string',
      bio: 'string',
    },
    result: {
      id: 66,
      username: 'user66',
      display_name: 'string',
      email: 'test.svietldf22ana1@gmail.com',
      avatar: null,
      phone: '+79261112233',
      date_joined: '2024-03-05T14:23:27.430000Z',
      country: 'string',
      city: 'string',
      first_name: 'string',
      last_name: 'string',
      bio: 'string',
      is_active: false,
      is_staff: false,
      is_admin: false,
    },
  },
  deleteUser: {
    username: 'test-user',
  },
}

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
  http.delete(
    `${BASE_URL}user/${mocks.deleteUser.username}`,
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
