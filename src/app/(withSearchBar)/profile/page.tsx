'use client'

import { useMemo } from 'react'
import styles from './profile.module.scss'
import { authApi, useGetCurentUserDataQuery } from '@/store/features/auth/auth.actions'
import Tabs, { TabData } from '@/components/ui/Tabs/Tabs.module'
import MyRecipies from '@/components/ui/MyRecipies/MyRecipies'
import Subscriptions from '@/components/ui/Subscriptions/Subscriptions'
import Subscribers from '@/components/ui/Subscribers/Subscribers'
import UserCard from '@/components/ui/UserCard/UserCard'

export default function ProfilePage() {
  const { data, isLoading, error, status } = authApi.useGetCurentUserDataQuery() //useGetCurentUserDataQuery()

  const tabs: TabData[] = useMemo(
    () =>
      data?.username
        ? [
            {
              label: `Рецепты`,
              Content: <MyRecipies username={data?.username} />,
            },
            {
              label: `Мои подписки`,
              Content: <Subscriptions username={data?.username} />,
            },
            {
              label: `Мои подписчики`,
              Content: <Subscribers username={data?.username} />,
            },
          ]
        : [],
    [data?.username],
  )

  if (error) return <div>{String(error)}</div>

  if (isLoading) return <div className={styles.loader}>Loading...</div>

  console.log({ data, isLoading, error, status })

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} scroll scroll--left scroll__thin`}>
        <UserCard username={data?.username} />
        <Tabs tabs={tabs} />
      </div>
      <div className={styles.rightbar} />
    </div>
  )
}
