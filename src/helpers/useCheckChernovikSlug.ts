import { useMemo } from 'react'

export const useCheckDraftSlug = (slug?: string): boolean => {
  const containsDraft = useMemo(() => {
    return !!slug && slug.includes('chernovik')
  }, [slug])

  return containsDraft
}
