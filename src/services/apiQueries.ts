//todo все операции с localStorage перенести в слайс userSettings
import { useAppSelector } from '@/store/features/hooks'
import {
  clearTokens,
  setAccessToken,
  userSettings,
} from '@/store/features/user/user.slice'
import {
  FetchArgs,
  fetchBaseQuery,
  type BaseQueryFn,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8000/api/v1/'

export const clitical401Errors = [
  'Не найдено активной учетной записи с указанными данными',
  'Пользователь не найден',
]

const injectAuth = (args: FetchArgs, authToken?: string | null): FetchArgs => {
  if (authToken) {
    args.headers = { ...args.headers, Authorization: `Bearer ${authToken}` }
  }

  return args
}

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
})

const userSettings1 = userSettings.getInitialState()
console.log({ userSettings1 })

// @ts-ignore
export const authBaseQuery: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // todo use await mutex.waitForUnlock() from 'async-mutex'. see https://redux-toolkit.js.org/rtk-query/usage/customizing-queries
  const { access_token: authToken1, refresh_token: refreshToken1 } =
    userSettings.getInitialState() //localStorage.getItem('access_token_svd')
  // здесь надо напрямую брать из localStorage, через userSettings.getInitialState() данные не успевают обновиться после записи
  const access_token = userSettings.getInitialState()
  const authToken = localStorage.getItem('access_token_svd')
  const refreshToken = localStorage.getItem('refresh_token_svd')
  debugger

  args = injectAuth(args, authToken)
  let result = await baseQuery(args, api, extraOptions)
  // получен ответ
  if (result.error?.status !== 401) return result

  // ошибка авторизации - разбираемся с ней
  console.log('authBaseQuery err 401', result.error)

  const { detail } = result.error.data as { detail: string }

  // case 1: error in login process -> incorrect login/password -> show error
  if (clitical401Errors.includes(detail)) {
    api.dispatch(clearTokens({}))

    return Promise.reject(detail)
  }

  // normal operations
  // case 2: authorization error on any other request -> incorrect access token -> try to refresh it with hepling refresh token
  const refreshResponse = await baseQuery(
    {
      url: `${BASE_URL}auth/jwt/refresh/`,
      method: 'POST',
      body: {
        refresh: refreshToken,
      },
    },
    api,
    extraOptions,
  )
  if (!refreshResponse.error) {
    // case 2.1: refreshing success -> set access token and refetch original query
    const { access } = refreshResponse.data as { access: string }
    api.dispatch(setAccessToken(access))
    args = injectAuth(args, access)

    return await baseQuery(args, api, extraOptions)
  }

  // case 2.2: error on refreshing access token -> refresh token in invalid -> relogin need
  debugger
  api.dispatch(clearTokens({}))
  if (window.location.href !== '/login')
    window.location.href = `/login?url="${window.location.href}"`
}
