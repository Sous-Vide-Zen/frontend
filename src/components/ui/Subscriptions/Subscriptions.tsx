import { FC } from 'react'
import styles from './Subscriptions.module.scss'
import Image from 'next/image'

interface SubscriptionsProps {
  username?: string
}

const Subscriptions: FC<SubscriptionsProps> = () => {
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
      <div className={styles.subscriptions_textContent}>
        <div className={styles.subscriptions_topText}>
          <h3 className={styles.subscriptions_title}>Kira_Epifanova</h3>
          <span className={styles.subscriptions_span}>(123 подписчика)</span>
        </div>
        <div className={styles.subscriptions_verticalEllipsis}>⋮</div>
        <p className={styles.subscriptions_full}>
          Увлекаюсь кулинарией уже 8 лет! Буду рада найти единомышленников и
          сделать мир су-вид лучше)
        </p>
      </div>
    </div>
  )
}

export default Subscriptions
