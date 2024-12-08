import { FC } from 'react'
import Image from 'next/image'

import styles from './Subscribtion.module.scss'
import { Author } from '@/store/features/common.types'

export interface SubscribtionProps {
  user: Author
  subscribers_count: number
}

export const Subscribtion: FC<SubscribtionProps> = ({
  user,
  subscribers_count,
}) => {
  return (
    <div className={styles.container}>
      {
        <Image
          alt="circle"
          src={user.avatar ?? '/img/subscriptions.png'}
          width={50}
          height={50}
          draggable={false}
        />
      }
      <div className={styles.subscriptions_textContent}>
        <div className={styles.subscriptions_topText}>
          <h3 className={styles.subscriptions_title}>{user.username}</h3>
          <span className={styles.subscriptions_span}>
            ({subscribers_count} подписчика/ов)
          </span>
        </div>
        <div className={styles.subscriptions_verticalEllipsis}>⋮</div>
        <p className={styles.subscriptions_full}>{user.bio}</p>
      </div>
    </div>
  )
}
