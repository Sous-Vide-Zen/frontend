import { createApi } from '@reduxjs/toolkit/query/react'
import { authBaseQuery, staggeredAuthBaseQuery } from '@/store/apiQueries'

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: staggeredAuthBaseQuery,
  endpoints: (build) => ({}),
})
