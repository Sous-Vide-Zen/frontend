import { Author, DataResponse, ListResponse, ListResponseSuccess } from '../common.types'

export type SubscribtionData = {
  id: number
  author: Author
  subscribers_count: number
}

export type SubscribtionsResponse = ListResponseSuccess<SubscribtionData>

export type SubscribersData = {
  id: number
  user: Author
  subscribers_count: number
}

export type SubscribersResponse = ListResponseSuccess<SubscribersData>

export type SubscribeRequest = {
  author: string
}

export type SubscribeResponse = DataResponse<{
  message: string
}>
