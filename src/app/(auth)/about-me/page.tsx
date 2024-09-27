'use client'

import { useParams, useRouter } from 'next/navigation'

import AboutMeForm from '@/components/forms/users/AboutMeForm'

//todo: после реализации хранения токенов доступа перенести сюда заполнение данных пользователя

export default function AboutMePage() {
  const params = useParams()
  const router = useRouter()

  return (
    <AboutMeForm
    // currentUserData={data}
    />
  )
}
