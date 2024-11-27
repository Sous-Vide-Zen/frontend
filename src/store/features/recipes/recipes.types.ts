import { Author, ListResponse } from '../common.types'

export type Category = { id: number; name: string; slug: string }

export type Ingredient = {
  name: string
  unit: string
  amount: number
}

export interface RecipeCommon {
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

export interface RecipeFull extends RecipeCommon {
  ingredients: Ingredient[]
  full_text: string
  updated_at: string
  views_count: number
}

export type RecipeUpdate = Pick<
  RecipeFull,
  'title' | 'ingredients' | 'full_text' | 'cooking_time'
> & {
  preview: string
  tags: string[]
  category: number[]
}

export interface PatchRecipe {
  slug: string
  data: Partial<RecipeUpdate>
}

export interface PublicateRecipe {
  slug: string
  data: Partial<RecipeUpdate> //todo: должен быть со всеми обзательными полями, возможно ошибки в документации
}

export interface ResipeDraftsElem {
  id: number
  draft_title: string
  slug: string
}
