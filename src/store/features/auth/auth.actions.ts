import { createApi } from '@reduxjs/toolkit/query/react'

import { authBaseQuery } from '@/services/apiQueries'
import {
  RegisterUserResponse,
  RegisterUserForm,
  LoginUserResponse,
  LoginUserForm,
} from '@/store/features/user/user.types'

export const authApi = createApi({
  reducerPath: 'userApi',
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<RegisterUserResponse, RegisterUserForm>({
      query: (body) => {
        return {
          url: 'auth/users/',
          method: 'POST',
          body,
        }
      },
    }),
    login: builder.mutation<LoginUserResponse, LoginUserForm>({
      query: (body) => {
        return {
          url: 'auth/jwt/create/',
          method: 'POST',
          body,
        }
      },
    }),
    /* todo переделать на authApi:
    fetchActivation ,
    fetchActivationUserToEmail 
    и удалить старые меторы из user.action
    */
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
} = authApi
