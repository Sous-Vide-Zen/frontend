import { FC } from 'react'
import styles from './Subscribtion.module.scss'
import { Author } from '@/store/features/common.types'

export interface SubscribtionProps {
  user: Author
  subscribers_count: number
}

export const Subscribtion: FC<SubscribtionProps> = ({
  subscribers_count,
  user: { id, username, avatar, bio },
}) => {
  return (
    <div className={styles.container}>
      Subscribtion <br />
      id-{id}
      <br />
      username-{username}
      <br />
      avatar-{avatar}
      <br />
      bio-{bio}
      <br />
      subscribers_count-{subscribers_count}
    </div>
  )
}
