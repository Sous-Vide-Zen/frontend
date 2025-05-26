import { useMemo } from 'react'

export const useCheckChernovikSlug = (slug?: string): boolean => {
  const containsChernovik = useMemo(() => {
    return !!slug && slug.includes('chernovik')
  }, [slug])

  return containsChernovik
}
