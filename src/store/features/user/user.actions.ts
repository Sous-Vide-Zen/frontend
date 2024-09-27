import { mainApi } from '@/store/api'
import { CurrentUserData, UserData, UserPatchData } from './user.types'

export const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<CurrentUserData, void>({
      query: () => ({ url: 'users/' }),
    }),
    getUserData: builder.query<UserData, string>({
      query: (username: string) => ({ url: `user/${username}/` }),
    }),
    patchUserData: builder.mutation<
      UserData,
      { userName: string; body: Partial<UserPatchData> }
    >({
      query: ({ userName, body }) => ({
        url: `user/${userName}/`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteUser: builder.mutation<null, string>({
      query: (username: string) => ({
        url: `user/${username}/`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetUsersQuery,
  useLazyGetUserDataQuery,
  usePatchUserDataMutation,
  useDeleteUserMutation,
} = userApi
