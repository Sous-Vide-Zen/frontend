import axios from 'axios'
import { createApi } from '@reduxjs/toolkit/query/react'
import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  CurrentUserData,
  IDataFromForm,
  // IDataFromResolve,
  IToken,
  UserData,
} from './user.types'
import { BASE_URL, instanceAxios } from '@/services/auth/auth.service'
import { authBaseQuery } from '@/services/apiQueries'

// регистрация пользователя
// export const fetchRegistration = createAsyncThunk<
//   IDataFromResolve,
//   IDataFromForm
// >(
//   'userRegistration/fetchRegistration',
//   async (dataFromForm, { rejectWithValue }) => {
//     try {
//       const res = await instanceAxios({
//         method: 'POST',
//         url: 'auth/users/',
//         data: dataFromForm,
//       })
//       return res.data
//     } catch (err) {
//       // @ts-ignore
//       return rejectWithValue(err?.response?.data)
//     }
//   },
// )

//todo: протестировать АКТИВАЦИЮ пользователя
// активация пользователя, получение токенов
export const fetchActivation = createAsyncThunk<IToken, IDataFromForm>(
  'userActivation/fetchActivation',
  async (dataFromForm, { rejectWithValue }) => {
    try {
      const res = await instanceAxios({
        method: 'POST',
        url: 'auth/jwt/create/',
        data: dataFromForm,
      })
      return res.data
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err?.response?.data)
    }
  },
)

// авторизация пользователя, получение токенов
// export const fetchAuthorization = createAsyncThunk<IToken, IDataFromForm>(
//   'userActivation/fetchAuthorization',
//   async (dataFromForm, { rejectWithValue }) => {
//     try {
//       const res = await instanceAxios({
//         method: 'POST',
//         url: 'auth/jwt/create/',
//         data: dataFromForm,
//       })
//       return res.data
//     } catch (err) {
//       // @ts-ignore
//       return rejectWithValue(err?.response?.data)
//     }
//   },
// )

// данные пользователя
// export const fetchDataUser = createAsyncThunk(
//   'userDataMe/fetchDataUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await instanceAxios({
//         method: 'GET',
//         url: 'auth/users/me',
//       })
//       // console.log("данные которые пришли с бека", res.data);
//       return res.data
//     } catch (err) {
//       // @ts-ignore
//       return rejectWithValue(err?.response?.data)
//     }
//   },
// )

// активация пользователя по эл.почте
export const fetchActivationUserToEmail = createAsyncThunk<any, any>(
  'userActivationToEmail/fetchActivationUserToEmail',
  async (dataFromUrlEmail, { rejectWithValue }) => {
    console.log(dataFromUrlEmail)
    try {
      const res = await axios({
        baseURL: `${BASE_URL}`,
        method: 'POST',
        url: 'auth/users/activation/',
        data: dataFromUrlEmail,
      })
      return res.data
    } catch (err) {
      // console.log(
      //   "ошибка которая пришла при попытке активации",
      //   rejectWithValue(err)
      // );
      // @ts-ignore
      return rejectWithValue(err?.response?.data)
    }
  },
)

// форма для изменения данных пользователя
// export const fetchFormDataUser = createAsyncThunk<any, any>(
//   'formDataUser/fetchFormDataUser',
//   async (dataFormUser, { rejectWithValue }) => {
//     try {
//       const formData = new FormData()
//       formData.append('display_name', dataFormUser.dataFromInput.display_name)
//       formData.append('first_name', dataFormUser.dataFromInput.first_name)
//       formData.append('last_name', dataFormUser.dataFromInput.last_name)
//       formData.append('phone', dataFormUser.dataFromInput.phone)
//       formData.append('country', dataFormUser.dataFromInput.country.label)
//       formData.append('city', dataFormUser.dataFromInput.city)
//       formData.append('bio', dataFormUser.dataFromInput.bio)
//       dataFormUser.avatar !== null
//         ? formData.append('avatar', dataFormUser.avatar)
//         : null
//       const res = await instanceAxios({
//         method: 'PATCH',
//         url: `user/${dataFormUser.username}/`,
//         data: formData,
//       })
//       return res.data
//     } catch (err) {
//       // console.log(
//       // 	'ошибка которая пришла при попытке изменения данных',
//       // 	rejectWithValue(err),
//       // )
//       //@ts-ignore
//       return rejectWithValue(err?.response?.data)
//     }
//   },
// )

// получение пользователя по username

// interface IResUserName {
//   id: number
//   username: string
//   display_name: string
//   email: string
//   avatar: string
//   city: string
//   country: string
//   bio: string
//   date_joined: string
//   first_name: string
//   last_name: string
//   is_active: boolean
//   is_banned: boolean
//   is_staff: boolean
//   is_admin: boolean
// }

// export const fetchDataUserName = createAsyncThunk<IResUserName, string>(
//   'dataUserName/fetchDataUserName',
//   async (username, { rejectWithValue }) => {
//     try {
//       const res = await instanceAxios({
//         method: 'GET',
//         url: `user/${username}`,
//       })
//       // console.log("данные которые пришли с бека", res.data);
//       return res.data
//     } catch (err) {
//       // @ts-ignore
//       return rejectWithValue(err?.response?.data)
//     }
//   },
// )

// RTK замена
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getCurentUserData: builder.query<CurrentUserData, void>({
      query: () => ({ url: 'auth/users/me' }),
    }),
    getUserData: builder.query<UserData, string>({
      query: (username: string) => ({ url: `user/${username}` }),
    }),
  }),
})

export const {
  useGetCurentUserDataQuery,
  useLazyGetCurentUserDataQuery,
  useLazyGetUserDataQuery,
} = userApi
