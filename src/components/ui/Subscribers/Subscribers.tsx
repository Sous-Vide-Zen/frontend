import { FC } from 'react'
import styles from './Subscribers.module.scss'
import Image from 'next/image'

interface SubscribersProps {
  username?: string
}

const Subscribers: FC<SubscribersProps> = () => {
  return (
    <div className={styles.container}>
      {
        <Image
          alt="circle"
          src={'/img/subscriptions.png'}
          width={50}
          height={50}
          draggable={false}
        />
      }
      <div className={styles.subscribers_textContent}>
        <div className={styles.subscribers_topText}>
          <h3 className={styles.subscribers_title}>Kira_Epifanova</h3>
          <span className={styles.subscribers_span}>(123 подписчика)</span>
        </div>
        <div className={styles.subscribers_verticalEllipsis}>⋮</div>
        <p className={styles.subscribers_full}>
          Увлекаюсь кулинарией уже 8 лет! Буду рада найти единомышленников и
          сделать мир су-вид лучше)
        </p>
      </div>
    </div>
  )
}

export default Subscribers
