import { createSlice } from '@reduxjs/toolkit'

export interface IInitialState {
  isAuth: boolean
  access_token?: string
  refresh_token?: string
}

const defaultState: IInitialState = {
  isAuth: false,
}

const userSettings = createSlice({
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
    setAccessTokens: (state, action) => {
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
    clearTokens: (state, action) => {
      localStorage.removeItem('access_token_svd')
      localStorage.removeItem('refresh_token_svd')
    },
  },
})

export const {
  checkLoginStatus,
  loginUser,
  logoutUser,
  setAccessTokens,
  setTokens,
  clearTokens,
} = userSettings.actions

export default userSettings.reducer
