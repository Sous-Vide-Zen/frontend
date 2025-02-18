import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  checkLoginStatus,
  loginUser,
  logoutUser,
} from '@/store/features/auth/auth.slice'

export const useAuth = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { accessToken, refreshToken, ...userData } = useAppSelector((state) => state.auth)

  useEffect(() => {
    dispatch(checkLoginStatus({}))
  }, [dispatch])

  const login = (tokens: any) => {
    dispatch(loginUser(tokens))
  }

  const logout = () => {
    dispatch(logoutUser({}))
    router.push('/')
  }

  return {
    ...userData, login, logout
  }
}
