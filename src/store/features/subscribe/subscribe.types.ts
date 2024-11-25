export type SubscribeData = {
  user: {
    id: number
    username: string
    avatar?: string
    bio?: string
  }
  subscribers_count: number
}

export type SubscribtionsResponse = {
  count: number
  next: string
  previous: string
  results: SubscribeData[]
}

export type SubscribeRequest = {
  author: string
}

export type SubscribeResponse = {
  message?: string
  detail?: string
}

