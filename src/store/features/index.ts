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
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import { createWrapper } from 'next-redux-wrapper'

import userActivateAccountReducer from './user/user-activation.slice'
import authReducer from './auth/auth.slice'
import userSettingsReducer from './user/user.slice'
import { recipeReactionsApi } from './reactions/reactions.actions'
import { userApi } from './user/user.actions'
import { recipeApi } from './recipes/recipes.actions'

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

export default storage
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

export const Store = configureStore({
  reducer: {
    userActivation: userActivateAccountReducer,
    auth: authPersistedReducer,
    userSettings: userSettingsPersistedReducer,
    [recipeReactionsApi.reducerPath]: recipeReactionsApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(recipeReactionsApi.middleware)
      .concat(userApi.middleware)
      .concat(recipeApi.middleware),
})

export const makeStore = () => Store
export const persistor = persistStore(Store)
export const storeWrapper = createWrapper<AppStore>(makeStore, { debug: true })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
