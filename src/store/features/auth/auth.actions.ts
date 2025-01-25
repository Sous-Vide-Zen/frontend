import { mainApi } from '@/store/api'
import {
  LoginUserResponse,
  LoginUserForm,
  RegisterUserResponse,
  RegisterUserForm,
  UserEmailData,
  UserNewEmailData,
  ResetPasswordData,
  SetEmailData,
  SetPasswordData,
  ActivationUserData,
  // CurrentAuthUserData,
  CurrentUserData
} from './auth.types'

export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getTokens: builder.mutation<LoginUserResponse, LoginUserForm>({
      query: (body) => {
        return {
          url: 'auth/jwt/create/',
          method: 'POST',
          body,
        }
      },
    }),

    // "auth/jwt/refresh" используется напрямую в apiQueries.ts

    verifyToken: builder.mutation<string, string>({
      query: (token) => {
        return {
          url: 'auth/jwt/verify/',
          method: 'POST',
          body: { token },
        }
      },
    }),

    // В документации 'auth/users' API помещены в раздел "2. Пользователь"
    getCurrentAuthUserData: builder.query<CurrentUserData, void>({
      query: () => {
        return {
          url: 'auth/users/me/',
          method: 'GET',
        }
      },
    }),
    getCurentUserData: builder.query<CurrentUserData, void>({
      query: () => ({ url: 'auth/users/me/' }),
    }),
    register: builder.mutation<RegisterUserResponse, RegisterUserForm>({
      query: (body) => {
        return {
          url: 'auth/users/',
          method: 'POST',
          body,
        }
      },
    }),
    activation: builder.mutation<ActivationUserData, ActivationUserData>({
      query: (body) => {
        return {
          url: 'auth/users/activation/',
          method: 'POST',
          body,
        }
      },
    }),
    resendActivation: builder.mutation<UserEmailData, UserEmailData>({
      query: (body) => {
        return {
          url: 'auth/users/activation/resend_activation/',
          method: 'POST',
          body,
        }
      },
    }),
    resetEmail: builder.mutation<UserEmailData, UserEmailData>({
      query: (body) => {
        return {
          url: 'auth/users/reset_email/',
          method: 'POST',
          body,
        }
      },
    }),
    resetEmailConfirm: builder.mutation<UserNewEmailData, UserNewEmailData>({
      query: (body) => {
        return {
          url: 'auth/users/reset_email_confirm/',
          method: 'POST',
          body,
        }
      },
    }),
    resetPassword: builder.mutation<UserEmailData, UserEmailData>({
      query: (body) => {
        return {
          url: 'auth/users/reset_password/',
          method: 'POST',
          body,
        }
      },
    }),
    resetPasswordConfirm: builder.mutation<
      ResetPasswordData,
      ResetPasswordData
    >({
      query: (body) => {
        return {
          url: 'auth/users/reset_password_confirm/',
          method: 'POST',
          body,
        }
      },
    }),
    setEmail: builder.mutation<SetEmailData, SetEmailData>({
      query: (body) => {
        return {
          url: 'auth/users/set_email/',
          method: 'POST',
          body,
        }
      },
    }),
    setPassword: builder.mutation<SetPasswordData, SetPasswordData>({
      query: (body) => {
        return {
          url: 'auth/users/set_password/',
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const {
  useGetTokensMutation,
  useVerifyTokenMutation,
  useGetCurrentAuthUserDataQuery,
  useGetCurentUserDataQuery,
  useLazyGetCurentUserDataQuery,
  useRegisterMutation,
  useActivationMutation,
  useResendActivationMutation,
  useResetEmailMutation,
  useResetEmailConfirmMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useSetEmailMutation,
  useSetPasswordMutation,
} = authApi
