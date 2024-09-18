'use client'
import styles from './registration.module.scss'
import RegisterForm from '@/components/forms/RegisterForm'

export default function Registration() {
  return (
    <div className={styles.container}>
      <h1>Добро пожаловать в мир су-вид.</h1>
      <RegisterForm />
    </div>
  )
}
