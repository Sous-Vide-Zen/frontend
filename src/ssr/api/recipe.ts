import axios from 'axios'
import { cache } from 'react'
import { cookies, headers } from 'next/headers'

import { IRecipeWithIngredients } from '@/store/features/recipes/recipes.types'

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8000/api/v1/'

const serverAxios = axios.create({
  baseURL: BASE_URL,
})

export const getHeaders = () => {
  let allHeader: Record<string, string> = {}
  const headerKeys = Array.from(headers().keys())
  for (const e of headerKeys) {
    allHeader[e] = headers().get(e) || ''
  }
  return allHeader
}

export const getCookies = () => {
  return cookies().getAll()
}

export const logHeadersAndCookies = () => {
  console.log({ headers: getHeaders(), cookies: getCookies() })
}

export const revalidate = 10

export const getRecipeData = cache(
  async (slug: string): Promise<IRecipeWithIngredients> => {
    console.log(`fetch "/recipe/${slug}/`)

    const result = await serverAxios.get(`recipe/${slug}/`)

    return result.data
  },
)
