import { BASE_URL } from '@/store/apiQueries'
import { makeStore } from '@/store/store'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { authApi } from './auth.actions'
import { authMocks as mocks } from './auth.actions.mocks'

/**
 * нужно для доступности 'window' и пр. внутри тестов
 * @vitest-environment jsdom
 */

const apiStore = makeStore()

const prefix = `${BASE_URL}auth/`

export const restHandlers = [
  // register
  http.post(`${prefix}users/`, () => {
    return HttpResponse.json(mocks.register.response)
  }),
  // getTokens
  http.post(`${prefix}jwt/create/`, () =>
    HttpResponse.json(mocks.getTokens.response),
  ),
  // verifyToken
  http.post(`${prefix}jwt/verify/`, () =>
    HttpResponse.json(mocks.verifyToken.response),
  ),
  // getCurentUserData
  http.get(`${prefix}users/me/`, () =>
    HttpResponse.json(mocks.getCurentUserData),
  ),
  // activation
  http.post(`${prefix}users/activation/`, () =>
    HttpResponse.json(mocks.activation.response),
  ),
  // resendActivation
  // resetEmail
  // resetEmailConfirm
  // resetPassword
  // resetPasswordConfirm
  // setEmail
  // setPassword
]

const server = setupServer(...restHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => server.close())

afterEach(() => server.resetHandlers())

describe('authApi', () => {
  it('should have the correct endpoints', () => {
    const endpoints = authApi.endpoints

    expect(endpoints.getTokens).toBeDefined()
    expect(endpoints.verifyToken).toBeDefined()
    expect(endpoints.getCurentUserData).toBeDefined()
    expect(endpoints.register).toBeDefined()
    expect(endpoints.activation).toBeDefined()
    expect(endpoints.resendActivation).toBeDefined()
    expect(endpoints.resetEmail).toBeDefined()
    expect(endpoints.resetEmailConfirm).toBeDefined()
    expect(endpoints.resetPassword).toBeDefined()
    expect(endpoints.resetPasswordConfirm).toBeDefined()
    expect(endpoints.setEmail).toBeDefined()
    expect(endpoints.setPassword).toBeDefined()
  })

  it('should get tokens', async () => {
    const result = await apiStore.dispatch<any>(
      authApi.endpoints.getTokens.initiate(mocks.getTokens.params),
    )

    expect(result.data.access).toBe(mocks.getTokens.response.access)
  })

  it('should verify tokens', async () => {
    const result = await apiStore.dispatch<any>(
      authApi.endpoints.verifyToken.initiate(mocks.verifyToken.token),
    )

    expect(result.data).toBe(mocks.verifyToken.response)
  })

  it('should get current user data', async () => {
    const result = await apiStore.dispatch<any>(
      authApi.endpoints.getCurentUserData.initiate(),
    )

    expect(result.data?.username).toBe(mocks.getCurentUserData.username)
  })

  it('should register user', async () => {
    const result = await apiStore.dispatch<any>(authApi.endpoints.register.initiate(mocks.register.params))

    expect(result.data?.email).toBe(mocks.register.response.email)
  })

  it('should activation user', async () => {
    const result = await apiStore.dispatch<any>(authApi.endpoints.activation.initiate(mocks.activation.params))

    expect(result.data?.token).toBe(mocks.activation.response.token)
  })
})
