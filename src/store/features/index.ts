import { configureStore } from '@reduxjs/toolkit'
import userRegistrationReducer from './user/user-registration.slice'
import userDateMeReducer from './user/user-data-me.slice'
import userActivateAccountReducer from './user/user-activation.slice'
import recipesFeedReducer from './recipes/recipes.slice'
import userSettingsReducer from './user/user.slice'
import userFormDataEdit from './user/user-data-form-edit.slice'
import getUserNameWithoutToken from './user/user-getData-username.slice'
import { recipeReactionsApi } from './reactions/reactions.actions'
import { userApi } from './user/user.actions'
import { recipeApi } from './recipes/recipes.actions'

const store = configureStore({
  reducer: {
    userRegistration: userRegistrationReducer,
    userDateMe: userDateMeReducer,
    userActivation: userActivateAccountReducer,
    userFormDataEdit: userFormDataEdit,
    recipesFeed: recipesFeedReducer,
    userSettings: userSettingsReducer,
    userName: getUserNameWithoutToken,
    [recipeReactionsApi.reducerPath]: recipeReactionsApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(recipeReactionsApi.middleware)
      .concat(userApi.middleware)
      .concat(recipeApi.middleware),
})

export const makeStore = () => store
export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
