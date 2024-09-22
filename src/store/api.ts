import { createApi } from '@reduxjs/toolkit/query/react'
import { staggeredAuthBaseQuery } from '@/store/apiQueries'

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: staggeredAuthBaseQuery,
  endpoints: (build) => ({}),
})
