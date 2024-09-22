import {
  RegisterUserResponse,
  RegisterUserForm,
  LoginUserResponse,
  LoginUserForm,
  CurrentUserData,
  ActivationUserData,
  UserEmailData,
  UserNewEmailData,
  ResetPasswordData,
  SetEmailData,
  SetPasswordData,
} from '@/store/features/user/user.types'
import { mainApi } from '@/store/api'

export const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginUserResponse, LoginUserForm>({
      query: (body) => {
        return {
          url: 'auth/jwt/create/',
          method: 'POST',
          body,
        }
      },
    }),
    verifyToken: builder.mutation<string, string>({
      query: (body) => {
        return {
          url: 'auth/jwt/verify/',
          method: 'POST',
          body,
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
          url: 'auth/users/resend_email/',
          method: 'POST',
          body,
        }
      },
    }),
    resetEmailConfirm: builder.mutation<UserNewEmailData, UserNewEmailData>({
      query: (body) => {
        return {
          url: 'auth/users/resend_email/',
          method: 'POST',
          body,
        }
      },
    }),
    resetPassword: builder.mutation<UserEmailData, UserEmailData>({
      query: (body) => {
        return {
          url: 'auth/users/resend_email/',
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
          url: 'auth/users/resend_email/',
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
  useLoginMutation,
  useVerifyTokenMutation,
  useGetCurentUserDataQuery,
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
