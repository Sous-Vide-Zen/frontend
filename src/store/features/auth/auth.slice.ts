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

export const authSlice = createSlice({
  name: 'auth',
  initialState: defaultState,
  reducers: {
    checkLoginStatus: (state, _action) => {
      const token = state.access_token
      state.isAuth = !!token
    },
    loginUser: (state, action) => {
      const { access, refresh } = action.payload
      state.access_token = access
      state.refresh_token = refresh
      state.isAuth = true
    },
    logoutUser: (state, _action) => {
      state.access_token = null
      state.refresh_token = null
      state.isAuth = false
    },
    setAccessToken: (state, action) => {
      state.access_token = action.payload
      state.isAuth = true
    },
    setTokens: (state, action) => {
      const { access, refresh } = action.payload
      state.access_token = access
      state.refresh_token = refresh
      state.isAuth = true
    },
    clearTokens: (state, _action) => {
      state.access_token = null
      state.refresh_token = null
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
} = authSlice.actions

export default authSlice.reducer
