import { FC, useEffect } from 'react'
import Image from 'next/image'

import styles from './Subscribtions.module.scss'
import { useGetUserSubscriptionsQuery } from '@/store/features/subscribe/subscribe.actions'
import { setMySubscriptionsCount } from '@/store/features/counters/counters.slice'
import { useAppDispatch } from '@/store/hooks'
import { Subscribtion } from '../Subscribtion'
import { Skeleton } from '../Skeletons'

interface SubscriptionsProps {
  username: string
}

export const Subscribtions: FC<SubscriptionsProps> = ({ username }) => {
  const dispatch = useAppDispatch()
  const { data, isError, error, isLoading, status } =
    useGetUserSubscriptionsQuery(username)

  useEffect(() => {
    if (data) {
      dispatch(setMySubscriptionsCount(data.count))
    }
  }, [data, dispatch])

  if (isLoading)
    return (
      <div className={styles.container}>
        <Skeleton height={110} />
        <Skeleton height={110} />
      </div>
    )

  if (isError) {
    const { data: errorData } = error as { data: any }
    console.log({ error })

    return (
      <div className={styles.container}>
        <div className={styles.error}>{JSON.stringify(errorData)}</div>
      </div>
    )
  }

  if (status === 'fulfilled')
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
          {data?.results.map((props) => (
            <Subscribtion key={props.id} {...props} />
          ))}
        </div>
      </div>
    )
}
