import { createSlice } from '@reduxjs/toolkit'

export interface IInitialState {
  isAuth: boolean
  access_token: string | null
  refresh_token: string | null
}

export const ACCESS_TOKEN_NAME = 'access_token_svd'
export const REFRESH_TOKEN_NAME = 'refresh_token_svd'

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
      const token = localStorage.getItem(ACCESS_TOKEN_NAME)
      state.isAuth = !!token
    },
    loginUser: (state, action) => {
      const { access, refresh } = action.payload
      state.access_token = access
      localStorage.setItem(ACCESS_TOKEN_NAME, access)
      state.refresh_token = refresh
      localStorage.setItem(REFRESH_TOKEN_NAME, refresh)
      state.isAuth = true
    },
    logoutUser: (state, _action) => {
      localStorage.removeItem(ACCESS_TOKEN_NAME)
      localStorage.removeItem(REFRESH_TOKEN_NAME)
      state.isAuth = false
    },
    setAccessToken: (state, action) => {
      localStorage.setItem(ACCESS_TOKEN_NAME, action.payload)
      state.isAuth = true
    },
    setTokens: (state, action) => {
      const { access, refresh } = action.payload
      state.access_token = access
      localStorage.setItem(ACCESS_TOKEN_NAME, access)
      state.refresh_token = refresh
      localStorage.setItem(REFRESH_TOKEN_NAME, refresh)
      state.isAuth = true
    },
    clearTokens: (state, _action) => {
      localStorage.removeItem(ACCESS_TOKEN_NAME)
      localStorage.removeItem(REFRESH_TOKEN_NAME)
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
