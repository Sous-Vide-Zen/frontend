'use client'
import styles from './welcomeback.module.scss'
import LoginForm from '@/components/forms/auth/LoginForm'

export default function welcomeback() {
  return (
    <div className={styles.container}>
      <h1 className={styles.paragraph}>С возвращением в мир су-вид!</h1>

      <LoginForm />
    </div>
  )
}
