import { createSlice } from '@reduxjs/toolkit'

export interface IInitialState {
  isAuth: boolean
  access_token: string | null
  refresh_token: string | null
}

const ACCESS_TOKEN_NAME = 'access_token_svd'
const REFRESH_TOKEN_NAME = 'refresh_token_svd'

export const getAcessToken = () => localStorage.getItem(ACCESS_TOKEN_NAME)
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_NAME)
export const setAcessToken = (token: string) => localStorage.setItem(ACCESS_TOKEN_NAME, token)
export const setRefreshToken = (token: string) => localStorage.setItem(REFRESH_TOKEN_NAME, token)
export const delAcessToken = () => localStorage.removeItem(ACCESS_TOKEN_NAME)
export const delRefreshToken = () => localStorage.removeItem(REFRESH_TOKEN_NAME)

const defaultState: IInitialState = {
  isAuth: false,
  access_token: null,
  refresh_token: null,
}

export const userSettings = createSlice({
  name: 'userSettings',
  initialState: defaultState,
  reducers: {
    checkLoginStatus: (state, _action) => {
      const token = getAcessToken()
      state.isAuth = !!token
    },
    loginUser: (state, action) => {
      const { access, refresh } = action.payload
      state.access_token = access
      setAcessToken(access)
      state.refresh_token = refresh
      setRefreshToken(refresh)
      state.isAuth = true
    },
    logoutUser: (state, _action) => {
      delAcessToken()
      delRefreshToken()
      state.isAuth = false
    },
    setAccessToken: (state, action) => {
      setAcessToken(action.payload)
      state.isAuth = true
    },
    setTokens: (state, action) => {
      const { access, refresh } = action.payload
      state.access_token = access
      setAcessToken(access)
      state.refresh_token = refresh
      setRefreshToken(refresh)
      state.isAuth = true
    },
    clearTokens: (state, _action) => {
      delAcessToken()
      delRefreshToken()
      state.isAuth = false
    },
  },
})

export const {
  checkLoginStatus,
  loginUser,
  logoutUser,
  setAccessToken,
  setTokens,
  clearTokens,
} = userSettings.actions

export default userSettings.reducer
