// https://redux.js.org/usage/nextjs

import { configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import { createWrapper } from 'next-redux-wrapper'
import createWebStorage from 'redux-persist/es/storage/createWebStorage'

import { mainApi } from '@/store/api'
import authReducer from './features/auth/auth.slice'
import userSettingsReducer from './features/user/user.slice'

// todo: это решение из инернета для решения ошибки в консоли "redux-persist failed to create sync storage. falling back to noop storage."
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null)
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: any) {
      return Promise.resolve()
    },
  }
}

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage()

const authPersistConfig = {
  key: 'auth',
  storage,
}
const authPersistedReducer = persistReducer(authPersistConfig, authReducer)

const userSettingsPersistConfig = {
  key: 'userSettings',
  storage,
}
const userSettingsPersistedReducer = persistReducer(
  userSettingsPersistConfig,
  userSettingsReducer,
)

const Store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    userSettings: userSettingsPersistedReducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(mainApi.middleware),
})

export const makeStore = () => Store
export const persistor = persistStore(Store)
export const storeWrapper = createWrapper<AppStore>(makeStore, { debug: true })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
