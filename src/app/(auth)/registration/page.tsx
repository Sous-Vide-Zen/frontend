'use client'
import styles from './registration.module.scss'
import RegisterForm from '@/components/forms/auth/RegisterForm'

export default function Registration() {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  )
}
