import { fillObjValues } from '@/helpers/objects'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AuthState = {
  isAuth: boolean
  id: number | null,
  username: string | null,
  display_name: string | null
  avatar: string | null
  is_active: boolean
  is_staff: boolean
  is_admin: boolean
  accessToken: string | null
  refreshToken: string | null
}

const defaultState: AuthState = {
  isAuth: false,
  id: null,
  display_name: null,
  avatar: null,
  is_active: false,
  is_staff: false,
  is_admin: false,
  username: null,
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
      fillObjValues(defaultState, state)
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
      fillObjValues(defaultState, state)
    },
    setUserAuthData: (
      state,
      action: PayloadAction<{ id: number; username: string }>,
    ) => {
      fillObjValues({ ...state, ...action.payload }, state)
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
  setUserAuthData
} = authSlice.actions

export default authSlice.reducer
