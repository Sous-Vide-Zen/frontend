import { Author, DataResponse, ListResponse, ListResponseSuccess } from '../common.types'

export type CommentData = {
  id: number
  author: Author
  text: string
  pub_date: string
  updated_date: string
}

export type RecipeCommentsResponse = ListResponseSuccess<CommentData>

export type CreateCommentBody = {
  text: string
  parent?: CommentData['id']
}

export type CreateCommenResponse = DataResponse<CommentData>

export type RemoveCommentResponse = DataResponse<{
  message: string
}>
