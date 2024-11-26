import { Author, ListResponse } from '../common.types'

export type IRecipeContainer = ListResponse<IRecipe>

export interface IRecipe {
  id: number
  title: string
  slug: string
  category: any[]
  short_text: string
  preview_image: null
  author: Author
  pub_date: string
  tag: {
    name: string
    slug: string
  }[]
  cooking_time: number
  comments_count: number
  views_count: number
  reactions_count: number
  reactions: any[]
  activity_count: number
  is_favorite: boolean
}

export interface IRecipeInitialState {
  recipes: {
    feed: IRecipe
    feedActivity: IRecipe
    feedSubscriptions: IRecipe
  }
  isError: any

  isLoading: boolean
  flag: boolean
}

export type IFetchListData = ListResponse<IRecipe>

export interface IRecipeWithIngredients extends IRecipe {
  ingredients: any[]
  full_text: string
}

export type GetRecipesResponse = ListResponse<IRecipe>

export interface IRecipeInitialState {
  recipes: {
    feed: IRecipe
    feedActivity: IRecipe
    feedSubscriptions: IRecipe
  }
  isError: any

  isLoading: boolean
  flag: boolean
}

export interface IPatchRecipeParams {
  slug: string
  data: IRecipeWithIngredients
}
