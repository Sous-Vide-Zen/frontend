'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAppDispatch } from '@/store/hooks'
import { logoutUser } from '@/store/features/auth/auth.slice'

export default function LogoutPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(logoutUser({}))
    router.push('/')
  }, [dispatch, router])
}
