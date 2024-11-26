import { Author, ListResponse, ListResponseSuccess } from '../common.types'

export type Category = { id: number; name: string; slug: string }

export type Ingredient = {
  name: string
  unit: string
  amount: number
}

interface RecipeCommon {
  id: number
  title: string
  slug: string
  author: Author
  preview_image?: string
  tag: { name: string; slug: string }[]
  category: Category[]
  cooking_time: number
  pub_date: string
  reactions_count: number
}

// для рецептов, получаемых списком в ленте
export interface RecipeFeed extends RecipeCommon {
  short_text: string
  comments_count: number
  views_count: number
  activity_count: number
  is_favorite: boolean
}

export interface RecipeFull extends RecipeCommon {
  ingredients: Ingredient[]
  full_text: string
  updated_at: string
  views_count: number
}

export type IFetchListData = ListResponseSuccess<RecipeFeed>

export interface IPatchRecipeParams {
  slug: string
  data: RecipeFull
}
