// заменено на baseQuery и authBaseQuery. Это оставлено для истории

import { SerializedError } from '@reduxjs/toolkit'
import {
  retry,
} from '@reduxjs/toolkit/query'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8000/api/v1/'

export const instanceAxios = axios.create({
  baseURL: BASE_URL,
})

let refresh = {}

if (typeof window !== 'undefined') {
  refresh = {
    refresh: localStorage.getItem('refresh_token_svd'),
  }
}

export const clearTokensAndGoToLogin = () => {
  localStorage.removeItem('access_token_svd')
  localStorage.removeItem('refresh_token_svd')
}

const urlsSkipAuth = ['auth/users/', 'auth/jwt/create/', 'feed/']
export const clitical401Errors = [
  'Не найдено активной учетной записи с указанными данными',
  'Пользователь не найден',
]

instanceAxios.interceptors.request.use(
  (config) => {
    if (config.url && urlsSkipAuth.includes(config.url)) {
      // console.log("сработал перехватчик на запрос");
      return config
    }

    const authToken = localStorage.getItem('access_token_svd')
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`
      // console.log("сработал перехватчик на POST устанавливает токен");
    }

    return config
  },
  (error) => {
    // console.log("Ошибка перед отправкой из АКСИОСА", error);
    return Promise.reject(error)
  },
)

instanceAxios.interceptors.response.use(
  (response) => {
    // console.log("сработал перехватчик после ответа без ошибок", response);
    return response
  },
  async (error) => {
    console.log('instanceAxios.interceptors', error)
    const originalRequest = error.config

    if (error.response.status == 401) {
      // case 1: error in login process -> incorrect login/password -> show error
      if (clitical401Errors.includes(error.response.data.detail)) {
        clearTokensAndGoToLogin()
        return Promise.reject(error)
      }

      // normal operations
      // case 2: authorization error on any other request -> incorrect access token -> try to refresh it with hepling refresh token
      try {
        const response = await axios.post(
          `${BASE_URL}auth/jwt/refresh/`,
          refresh,
        )
        // case 2.1: refreshing success -> set access token and refetch original query
        localStorage.setItem('access_token_svd', response.data.access)

        return instanceAxios.request(originalRequest)
      } catch (error) {
        // case 2.2: error on refreshing access token -> refresh token in invalid -> relogin need
        clearTokensAndGoToLogin()
        window.location.href = `/login?url="${window.location.href}"`
        return
      }
    }

    // case 3: other error -> standart behavior
    return Promise.reject(error)
  },
)

// для использования в RTK
// @ts-ignore
export const axiosBaseQuery: BaseQueryFn<
  AxiosRequestConfig,
  unknown,
  SerializedError
> = async (args, _api, _extraOptions) => {
  if (!args) return

  try {
    const result = await instanceAxios(args)
    return { data: result.data }
  } catch (axiosError) {
    const err = axiosError as AxiosError<
      {
        detail: string
      },
      unknown
    >

    if (err.response?.status !== 429) {
      retry.fail(err.response?.data.detail)
    }

    return {
      error: {
        code: err.response?.status,
        message: err.response?.data.detail,
      },
    }
  }
}
