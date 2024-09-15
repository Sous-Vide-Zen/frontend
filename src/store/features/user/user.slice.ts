import { createSlice } from '@reduxjs/toolkit'
import { RecipeListFilter, RecipeListOrdering as RecipeListSort } from '@/hooks/dispatcher.types'

export type RecipeListView = 'feed' | 'tile'
export type MyRecipeSort = 'date' | 'ingredients'

export interface IInitialState {
  view: RecipeListView
  filter?: RecipeListFilter
  sort: RecipeListSort
  myRecipesSort: MyRecipeSort
  myRecipesFromDate?: string // date with format 'yyyy-mm-dd'
}

const defaultState: IInitialState = {
  view: 'feed',
  sort: 'default',
  myRecipesSort: 'date',
}

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState: defaultState,
  reducers: {
    setViewMode: (state, action) => {
      state.view = action.payload
    },
    setFilterMode: (state, action) => {
      state.filter = action.payload
    },
    setSortMode: (state, action) => {
      state.sort = action.payload
    },
    setSortMyRecipesMode: (state, action) => {
      state.myRecipesSort = action.payload
    },
    setDateSortMyRecipes: (state, action) => {
      state.myRecipesFromDate = action.payload
    },
  },
})

export const {
  setViewMode,
  setFilterMode,
  setSortMode,
  setSortMyRecipesMode,
  setDateSortMyRecipes,
} = userSettingsSlice.actions

export default userSettingsSlice.reducer
