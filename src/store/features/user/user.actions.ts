import { createApi } from '@reduxjs/toolkit/query/react'

import { authBaseQuery } from '@/services/apiQueries'
import { CurrentUserData, UserData } from './user.types'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<CurrentUserData, void>({
      query: () => ({ url: 'users' }),
    }),
    getUserData: builder.query<UserData, string>({
      query: (username: string) => ({ url: `user/${username}` }),
    }),
    patchUserData: builder.query<UserData, string>({
      query: (username: string) => ({
        url: `user/${username}`,
        method: 'PATCH',
      }),
    }),
    deleteUser: builder.query<null, string>({
      query: (username: string) => ({
        url: `user/${username}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetUsersQuery,
  useLazyGetUserDataQuery,
  useLazyPatchUserDataQuery,
  useDeleteUserQuery,
} = userApi
