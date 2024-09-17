export interface IRecipeContainer {
  count: number
  next: string
  previous: null
  results: IRecipe[]
}

export interface IRecipe {
  id: number
  title: string
  slug: string
  category: any[]
  short_text: string
  preview_image: null
  author: Author
  pub_date: string
  tag: any[]
  cooking_time: number
  comments_count: number
  views_count: number
  reactions_count: number
  reactions: any[]
  activity_count: number
  is_favorite: boolean
}

export interface Author {
  id: number
  username: string
  avatar: string
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

export interface IFetchListData {
  count: number
  next: string
  previous: string
  results: IRecipe[]
  detail?: string
}

export interface IRecipeWithIngredients extends IRecipe {
  ingredients: any[]
  full_text: string
}

export interface GetRecipesResponse {
  count: number
  next: string
  previous: null
  results: IRecipe[]
}

export interface Author {
  id: number
  username: string
  avatar: string
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

export interface IPatchRecipeParams {
  slug: string
  data: IRecipeWithIngredients
}
