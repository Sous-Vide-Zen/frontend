import { FC, useEffect } from 'react'
import Image from 'next/image'

import styles from './Subscribers.module.scss'
import { useGetUserSubscribersQuery } from '@/store/features/subscribe/subscribe.actions'
import { setMySubscribersCount } from '@/store/features/counters/counters.slice'
import { useAppDispatch } from '@/store/hooks'
import { Subscribtion } from '../Subscribtion'

interface SubscribersProps {
  username: string
}

export const Subscribers: FC<SubscribersProps> = ({ username }) => {
  const dispatch = useAppDispatch()
  const { data, isError, error, isLoading, status } =
    useGetUserSubscribersQuery(username)

  useEffect(() => {
    if (data) {
      dispatch(setMySubscribersCount(data.count))
    }
  }, [data, dispatch])

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          placeholder="Введите имя пользователя"
          className={styles.input}
        />
        <Image
          src="/img/search-dark.svg"
          width={24}
          height={24}
          alt="search"
          className={styles.inputImg}
          draggable={false}
        />
      </div>
      <div className={styles.list}>
        {data?.results.map(({ id, user, subscribers_count }) => (
          <Subscribtion
            key={id}
            id={id}
            author={user}
            subscribers_count={subscribers_count}
          />
        ))}
      </div>
    </div>
  )
}
