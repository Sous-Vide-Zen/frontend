'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import styles from './login.module.scss'
import { useAuth } from '@/hooks/useAuth'
import { setUserAuthData } from '@/store/features/auth/auth.slice'
import { useAppDispatch } from '@/store/hooks'
import { useLazyGetCurentUserDataQuery } from '@/store/features/auth/auth.actions'
import LoginForm from '@/components/forms/auth/LoginForm'

export default function LoginPage() {
  const router = useRouter()
  const { isAuth } = useAuth()
  const dispatch = useAppDispatch()
  const [
    loadCurrentUserData,
    { data: userLoadingData, status: userLoadingStatus },
  ] = useLazyGetCurentUserDataQuery()

  useEffect(() => {
    if (isAuth) {
      setTimeout(() => {
        loadCurrentUserData()
      }, 100)
    }
  }, [isAuth, loadCurrentUserData])

  useEffect(() => {
    if (userLoadingStatus === 'fulfilled' && userLoadingData) {
      const { id, username } = userLoadingData
      dispatch(setUserAuthData({ id, username }))

      const oldUrl = window.location.href.split('%22')[1]
      if (isAuth) router.push(oldUrl || '/')
    }
  }, [dispatch, isAuth, router, userLoadingData, userLoadingStatus])

  return (
    <div className={styles.container}>
      <h1>Добро пожаловать в мир су-вид.</h1>
      <LoginForm />
    </div>
  )
}
