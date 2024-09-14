import { createSlice } from '@reduxjs/toolkit'
import { RecipeListVariant } from '@/hooks/useRecipes'

export type RecipeView = 'feed' | 'tile'
export type MyRecipeSort = 'date' | 'ingredients'

export interface IInitialState {
  view: RecipeView
  sort: RecipeListVariant
  sortMyRecipes: MyRecipeSort
  sortMyRecipesDate?: string // date with format 'yyyy-mm-dd'
}

const defaultState: IInitialState = {
  view: 'feed',
  sort: 'top',
  sortMyRecipes: 'date',
}

const saveSliceToLocalStorage = (state: IInitialState) => {
  localStorage.setItem('userSettings', JSON.stringify(state))
}

const recipesSettings = createSlice({
  name: 'recipesFeed',
  initialState: defaultState,
  reducers: {
    setSlice: (state, action) => {
      const payload: IInitialState = action.payload ?? defaultState
      // здесь нужен именно такой способ заполнения state
      for(let key in payload) {
        // @ts-ignore
        state[key] = payload[key]
      }
    },
    setViewMode: (state, action) => {
      state.view = action.payload
      saveSliceToLocalStorage(state)
    },
    setSortMode: (state, action) => {
      state.sort = action.payload
      saveSliceToLocalStorage({ ...state, sort: action.payload })
    },
    setSortMyRecipesMode: (state, action) => {
      state.sortMyRecipes = action.payload
      saveSliceToLocalStorage(state)
    },
    setDateSortMyRecipes: (state, action) => {
      state.sortMyRecipesDate = action.payload
      saveSliceToLocalStorage(state)
    },
  },
})

export const {
  setSlice,
  setViewMode,
  setSortMode,
  setSortMyRecipesMode,
  setDateSortMyRecipes,
} = recipesSettings.actions
export default recipesSettings.reducer
