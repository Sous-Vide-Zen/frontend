import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  RecipeListOrdering as RecipeListSort,
} from '@/hooks/dispatcher.types'

export type RecipeListView = 'feed' | 'tile'
export type MyRecipeSort = 'date' | 'ingredients'

export interface IInitialState {
  view: RecipeListView
  sort: RecipeListSort
  myRecipesSort: MyRecipeSort
  myRecipesFromDate?: string // date with format 'yyyy-mm-dd'
}

const defaultState: IInitialState = {
  view: 'feed',
  sort: 'top',
  myRecipesSort: 'date',
}

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState: defaultState,
  reducers: {
    setViewMode: (state, action: PayloadAction<RecipeListView>) => {
      state.view = action.payload
    },
    setSortMode: (state, action: PayloadAction<RecipeListSort>) => {
      state.sort = action.payload
    },
    setSortMyRecipesMode: (state, action: PayloadAction<MyRecipeSort>) => {
      state.myRecipesSort = action.payload
    },
    setDateSortMyRecipes: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      state.myRecipesFromDate = action.payload
    },
  },
})

export const {
  setViewMode,
  setSortMode,
  setSortMyRecipesMode,
  setDateSortMyRecipes,
} = userSettingsSlice.actions

export default userSettingsSlice.reducer
