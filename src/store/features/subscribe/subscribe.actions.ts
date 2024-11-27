import { mainApi } from '@/store/api'
import { SubscribeResponse, SubscribtionsResponse } from './subscribe.types'

export const subscribeApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserSubscriptions: builder.query<SubscribtionsResponse, string>({
      query: (username) => ({ url: `user/${username}/subscriptions/` }),
    }),
    getUserSubscribers: builder.query<SubscribtionsResponse, string>({
      query: (username) => ({ url: `user/${username}/subscribers/` }),
    }),
    subscribe: builder.mutation<SubscribeResponse, string>({
      query: (author) => ({
        url: `subscribe/`,
        method: 'POST',
        body: { author },
      }),
    }),
    unsubscribe: builder.mutation<SubscribeResponse, string>({
      query: (author) => ({
        url: `subscribe/`,
        method: 'DELETE',
        body: { author },
      }),
    }),
  }),
})

export const {
  useGetUserSubscriptionsQuery,
  useLazyGetUserSubscriptionsQuery,
  useGetUserSubscribersQuery,
  useLazyGetUserSubscribersQuery,
  useSubscribeMutation,
  useUnsubscribeMutation
} = subscribeApi
