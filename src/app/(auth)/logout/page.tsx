'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAppDispatch } from '@/store/features/hooks'
import { logoutUser } from '@/store/features/auth/auth.slice'

export default function Logout() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(logoutUser({}))
    router.push('/')
  }, [dispatch, router])
}
