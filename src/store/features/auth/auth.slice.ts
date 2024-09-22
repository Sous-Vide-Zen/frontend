import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IInitialState {
  isAuth: boolean
  accessToken: string | null
  refreshToken: string | null
}

const defaultState: IInitialState = {
  isAuth: false,
  accessToken: null,
  refreshToken: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: defaultState,
  reducers: {
    checkLoginStatus: (state, _action) => {
      const token = state.accessToken
      state.isAuth = !!token
    },
    loginUser: (
      state,
      action: PayloadAction<{ access: string; refresh: string }>,
    ) => {
      const { access, refresh } = action.payload
      state.accessToken = access
      state.refreshToken = refresh
      state.isAuth = true
    },
    logoutUser: (state, _action) => {
      state.accessToken = null
      state.refreshToken = null
      state.isAuth = false
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
      state.isAuth = true
    },
    setTokens: (
      state,
      action: PayloadAction<{ access: string; refresh: string }>,
    ) => {
      const { access, refresh } = action.payload
      state.accessToken = access
      state.refreshToken = refresh
      state.isAuth = true
    },
    clearTokens: (state, _action) => {
      state.accessToken = null
      state.refreshToken = null
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
