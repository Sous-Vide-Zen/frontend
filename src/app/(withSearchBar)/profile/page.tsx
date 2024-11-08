'use client'

import styles from './profile.module.scss'
import { authApi } from '@/store/features/auth/auth.actions'
import Tabs, { TabData } from '@/components/ui/Tabs/Tabs.module'
import MyRecipies from '@/components/ui/MyRecipies/MyRecipies'
import Subscriptions from '@/components/ui/Subscriptions/Subscriptions'
import Subscribers from '@/components/ui/Subscribers/Subscribers'
import UserCard from '@/components/ui/UserCard/UserCard'
import { useAppSelector } from '@/store/hooks'

export default function ProfilePage() {
  const { data, error } = authApi.useGetCurentUserDataQuery()
  const {
    profileTabMyRecipies,
    profileTabMySubscribers,
    profileTabMySubscriptions,
  } = useAppSelector((state) => state.counters)

  const tabs: TabData[] = [
    {
      label:
        profileTabMyRecipies !== undefined
          ? `Рецепты (${profileTabMyRecipies})`
          : `Рецепты`,
      Content: <MyRecipies username={data?.username} />,
    },
    {
      label:
        profileTabMySubscriptions !== undefined
          ? `Мои подписки (${profileTabMySubscriptions})`
          : `Мои подписки`,
      Content: <Subscriptions username={data?.username} />,
    },
    {
      label:
        profileTabMySubscribers !== undefined
          ? `Мои подписчики (${profileTabMySubscribers})`
          : `Мои подписчики`,
      Content: <Subscribers username={data?.username} />,
    },
  ]

  if (error) return <div>{String(error)}</div>

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} scroll scroll--left scroll__thin`}>
        <UserCard username={data?.username || ''} />
        <Tabs tabs={tabs} />
      </div>
      <div className={styles.rightbar} />
    </div>
  )
}
