import { FC } from 'react'

import styles from './Subscribers.module.scss'
import { Author } from '@/store/features/common.types'
import { Subscribtion } from '../Subscribtion'

interface SubscribersProps {
  username?: string
}

export const Subscribers: FC<SubscribersProps> = () => {
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
