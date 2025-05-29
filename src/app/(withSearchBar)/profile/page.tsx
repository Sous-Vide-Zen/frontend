'use client'

import styles from './profile.module.scss'
import { useAppSelector } from '@/store/hooks'
import { useAuth } from '@/hooks/useAuth'
import Tabs, { TabData } from '@/components/ui/Tabs/Tabs.module'
import MyRecipies from '@/components/ui/MyRecipies/MyRecipies'
import MyDrafts from '@/components/ui/MyDrafts/MyDrafts'
import { Subscribtions } from '@/components/ui/Subscribtions'
import { Subscribers } from '@/components/ui/Subscribers'
import UserCard from '@/components/ui/UserCard/UserCard'

export default function ProfilePage() {
  const { isAuth, logout, username } = useAuth()
  const {
    profileTabMyRecipies,
    profileTabMySubscribers,
    profileTabMySubscriptions,
  } = useAppSelector((state) => state.counters)

  const tabs: TabData[] = [
    {
      label: `Рецепты (${profileTabMyRecipies})`,
      Content: <MyRecipies username={username ?? undefined} />,
    },
    {
      label: `Мои подписки (${profileTabMySubscriptions})`,
      Content: <Subscribtions username={username ?? ''} />,
    },
    {
      label: `Мои подписчики (${profileTabMySubscribers})`,
      Content: <Subscribers username={username ?? ''} />,
    },
  ]

  if (!isAuth) {
    logout()
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} scroll scroll--left scroll__thin`}>
        <UserCard username={username ?? ''} />
        <Tabs tabs={tabs} defaultTab={0} />
      </div>
      <div className={styles.rightbar} />
    </div>
  )
}
