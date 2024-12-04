import { ListResponseSuccess } from '../common.types'
import { RecipeCommon } from '../recipes/recipes.types'

export interface RecipeFeed extends RecipeCommon {
  short_text: string
  comments_count: number
  views_count: number
  activity_count: number
  is_favorite: boolean
}

export type FetchListData = ListResponseSuccess<RecipeFeed>
