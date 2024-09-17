import {
  FetchArgs,
  fetchBaseQuery,
  type BaseQueryFn,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

import { clearTokens, setAccessToken } from '@/store/features/auth/auth.slice'
import { makeStore } from '@/store/features'

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8000/api/v1/'

// при 401 ошибках только с таким текстом будет обновляться access_token
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

const mutex = new Mutex()

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
})

// @ts-ignore
export const authBaseQuery: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()

  const store = makeStore()
  const { access_token: authToken, refresh_token: refreshToken } =
    store.getState().auth

  args = injectAuth(args, authToken)
  let result = await baseQuery(args, api, extraOptions)

  // получен ответ
  if (result.error?.status !== 401) return result

  // checking whether the mutex is locked
  if (!mutex.isLocked()) {
    const release = await mutex.acquire()

    try {
      // ошибка авторизации - разбираемся с ней
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
      api.dispatch(clearTokens({}))
      if (window.location.href !== '/login')
        window.location.href = `/login?url="${window.location.href}"`
    } finally {
      // release must be called once the mutex should be released again.
      release()
    }
  } else {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock()
    result = await baseQuery(args, api, extraOptions)
  }
}
