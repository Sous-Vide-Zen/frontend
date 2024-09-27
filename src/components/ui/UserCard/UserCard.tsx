'use client'

import { FC, useEffect } from 'react'

import styles from './UserCard.module.scss'
import { useLazyGetUserDataQuery } from '@/store/features/user/user.actions'
import { Loader } from '@/components/ui/Loader/Loader'
import ProfileAvatar from '@/components/ui/ProfileAvatar/ProfileAvatar'
import LinkLikeButton from '@/components/ui/LinkLikeButton/LinkLikeButton'

type Props = {
  username?: string
}

const UserCard: FC<Props> = ({ username }) => {
  const [trigger, { data, error, isLoading }] = useLazyGetUserDataQuery()

  useEffect(() => {
    if (username) {
      trigger(username)
    }
  }, [trigger, username])

  if (error) return <div>{String(error)}</div>

  if (isLoading) return <Loader />

  return (
    <div className={styles.userContainer}>
      <div className={styles.userFooter}>
        <ProfileAvatar data={data} />
        <LinkLikeButton href="/about-me" color="clear" size="small">
          Редактировать профиль
        </LinkLikeButton>
      </div>
      <div className={styles.userCard}>
        <h2>{data?.display_name}</h2>
        <div className={styles.userInfo}>
          <p>
            город {data?.city}, {data?.country}
          </p>
          <p>{data?.bio}</p>
        </div>
      </div>
    </div>
  )
}

export default UserCard
