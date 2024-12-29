import { FC } from 'react'
import Image from 'next/image'

import styles from './Subscribtion.module.scss'
import { SubscribtionData } from '@/store/features/subscribe/subscribe.types'

export const Subscribtion: FC<SubscribtionData> = ({
  author,
  subscribers_count,
}) => {
  return (
    <div className={styles.container}>
      {
        <Image
          alt="circle"
          src={author.avatar ?? '/img/subscriptions.png'}
          width={50}
          height={50}
          draggable={false}
        />
      }
      <div className={styles.subscriptions_textContent}>
        <div className={styles.subscriptions_topText}>
          <h3 className={styles.subscriptions_title}>{author.username}</h3>
          <span className={styles.subscriptions_span}>
            ({subscribers_count} подписчика/ов)
          </span>
        </div>
        <div className={styles.subscriptions_verticalEllipsis}>⋮</div>
        <p className={styles.subscriptions_full}>{author.bio}</p>
      </div>
    </div>
  )
}
