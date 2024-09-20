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

import authReducer from './auth/auth.slice'
import userSettingsReducer from './user/user.slice'
import { recipeReactionsApi } from './reactions/reactions.actions'
import { userApi } from './user/user.actions'
import { recipeApi } from './recipes/recipes.actions'
import storage from 'redux-persist/lib/storage'


// todo: это решение из инернета для решения ошибки в консоли "redux-persist failed to create sync storage. falling back to noop storage."
// но это вызывает 500 ошибку "ReferenceError: Cannot access 'authBaseQuery' before initialization"
// вопрос открытый...
// const createNoopStorage = () => {
//   return {
//     getItem(_key: any) {
//       return Promise.resolve(null)
//     },
//     setItem(_key: any, value: any) {
//       return Promise.resolve(value)
//     },
//     removeItem(_key: any) {
//       return Promise.resolve()
//     },
//   }
// }

// const storage =
//   typeof window !== 'undefined'
//     ? createWebStorage('local')
//     : createNoopStorage()

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
