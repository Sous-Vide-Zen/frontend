import { FC } from 'react'

import styles from './Subscriptions.module.scss'
import { Author } from '@/store/features/common.types'
import { Subscribtion } from '../Subscribtion'

interface SubscriptionsProps {
  username?: string
}

export const Subscriptions: FC<SubscriptionsProps> = () => {
  const subscribers: {
    user: Author
    subscribers_count: number
  }[] = []

  return (
    <div className={styles.container}>
      {subscribers.map((props, key: number) => (
        <Subscribtion key={key} {...props} />
      ))}
    </div>
  )
}
