'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import styles from './login.module.scss'
import { useAuth } from '@/hooks/useAuth'
import LoginForm from '@/components/forms/auth/LoginForm'

export default function LoginPage() {
  const router = useRouter()
  const { isAuth } = useAuth()

  useEffect(() => {
    const oldUrl = window.location.href.split('%22')[1]

    if (isAuth) router.push(oldUrl || '/')
  }, [isAuth, router])

  return (
    <div className={styles.container}>
      <h1>Добро пожаловать в мир су-вид.</h1>
      <LoginForm />
    </div>
  )
}
