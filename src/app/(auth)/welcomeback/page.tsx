'use client'
import styles from './activate.module.scss'
import LoginForm from '@/components/forms/auth/LoginForm'

export default function welcomeback() {
  return (
    <div className={styles.container}>
      <p className={styles.paragraph}>С возвращением в мир су-вид!</p>

      <LoginForm />
    </div>
  )
}
