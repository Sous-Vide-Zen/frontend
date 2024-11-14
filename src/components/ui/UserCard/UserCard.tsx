'use client'

import { FC, useEffect, useState } from 'react'

import styles from './UserCard.module.scss'
import { useLazyGetUserDataQuery } from '@/store/features/user/user.actions'
import ProfileAvatar from '@/components/ui/ProfileAvatar/ProfileAvatar'
import LinkLikeButton from '@/components/ui/LinkLikeButton/LinkLikeButton'
import { Skeleton } from '@/components/ui/Skeletons/skeletons'
import { COUNTRIES } from '@/helpers/countries'

type Props = {
  username: string
}

const UserCard: FC<Props> = ({ username }) => {
  const [trigger, { data, error, isLoading }] = useLazyGetUserDataQuery()
  const [displayName, setDisplayName] = useState('')

  useEffect(() => {
    if (username) {
      trigger(username)
    }
  }, [trigger, username])

  useEffect(() => {
    if (data) {
      const newDisplayName: string =
        data.first_name || data.last_name
          ? `${data.first_name ?? ''} ${data.last_name ?? ''}`
          : data.display_name
      setDisplayName(newDisplayName || username)
    }
  }, [data, username])

  if (error) return <div>{String(error)}</div>

  return !data ? (
    <div className={styles.userContainer}>
      <div className={styles.userFooter}>
        <ProfileAvatar data={data} />
      </div>
      <div className={styles.userCard}>
        <h2>
          <Skeleton width={300} />
        </h2>
        <div className={styles.userInfo}>
          <Skeleton width={300} height={18} />
          <Skeleton width={300} height={18} />
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.userContainer}>
      <div className={styles.userFooter}>
        <ProfileAvatar data={data} />
        <LinkLikeButton href="/about-me" color="clear" size="small">
          Редактировать профиль
        </LinkLikeButton>
      </div>
      <div className={styles.userCard}>
        <h2>{displayName}</h2>
        <div className={styles.userInfo}>
          <p>
            город {data.city},{' '}
            {
              COUNTRIES.find(
                ({ value }: { value: string }) => value === data.country,
              )?.label
            }
          </p>
          <p>{data.bio}</p>
        </div>
      </div>
    </div>
  )
}

export default UserCard
