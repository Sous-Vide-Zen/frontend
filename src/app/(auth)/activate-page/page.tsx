'use client'
import styles from './activate.module.scss'
import LoginForm from '@/components/forms/LoginForm'

export default function Authentication() {
  return (
    <div className={styles.container}>
      <p className={styles.paragraph}>С возвращением в мир су-вид!</p>

      <LoginForm />
    </div>
  )
}
