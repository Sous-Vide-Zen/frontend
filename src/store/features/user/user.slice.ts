import { createSlice } from '@reduxjs/toolkit'

export interface IInitialState {
  isAuth: boolean
  access_token: string | null
  refresh_token: string | null
}

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
      const token = localStorage.getItem('access_token_svd')
      state.isAuth = !!token
    },
    loginUser: (state, action) => {
      const { access, refresh } = action.payload
      state.access_token = access
      localStorage.setItem('access_token_svd', access)
      state.refresh_token = refresh
      localStorage.setItem('refresh_token_svd', refresh)
      state.isAuth = true
    },
    logoutUser: (state, _action) => {
      localStorage.removeItem('access_token_svd')
      localStorage.removeItem('refresh_token_svd')
      state.isAuth = false
    },
    setAccessToken: (state, action) => {
      localStorage.setItem('access_token_svd', action.payload)
      state.isAuth = true
    },
    setTokens: (state, action) => {
      const { access, refresh } = action.payload
      state.access_token = access
      localStorage.setItem('access_token_svd', access)
      state.refresh_token = refresh
      localStorage.setItem('refresh_token_svd', refresh)
      state.isAuth = true
    },
    clearTokens: (state, _action) => {
      localStorage.removeItem('access_token_svd')
      localStorage.removeItem('refresh_token_svd')
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
