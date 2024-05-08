'use client'

import Image from 'next/image'
import { FC, useEffect } from 'react'
import styles from './UserCard.module.scss'
import { useLazyGetUserDataQuery } from '@/store/features/user/user.actions'
import { Loader } from '@/components/ui/Loader/Loader'
import Button from '@/components/ui/Button/Button'

type Props = {
  username?: string
}

const UserCard: FC<Props> = ({ username }) => {
  const [trigger, { data, error, isError, isLoading, isFetching }] =
    useLazyGetUserDataQuery()

  useEffect(() => {
    if (username) {
      trigger(username)
    }
  }, [trigger, username])

  const editProfileHandler = () => {
    console.log('edit profile')
  }

  if (error) return <div>{String(error)}</div>

  if (isLoading) return <Loader />

  return (
    <div className={styles.userContainer}>
      <div className={styles.userFooter}>
        <Image
          src={data?.avatar ?? '/img/user-big.svg'}
          priority={true}
          width={120}
          height={120}
          alt="user image"
        />
        <Button onClick={editProfileHandler}>Редактировать профиль</Button>
      </div>
      <div className={styles.userCard}>
        <h2>{data?.display_name}</h2>
        <div className={styles.userInfo}>
          <p>город {data?.city}</p>
          <p>{data?.bio}</p>
        </div>
      </div>
    </div>
  )
}

export default UserCard
