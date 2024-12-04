import { Author, DataResponse, ListResponse } from '../common.types'

export type SubscribeData = {
  user: Author
  subscribers_count: number
}

export type SubscribtionsResponse = ListResponse<SubscribeData>

export type SubscribeRequest = {
  author: string
}

export type SubscribeResponse = DataResponse<{
  message: string
}>
