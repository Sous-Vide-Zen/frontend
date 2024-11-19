import { FC } from 'react'
import styles from './Subscribtion.module.scss'

export interface SubscribtionProps {
  user: {
    id: number
    username: string
    avatar?: string
    bio?: string
  }
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
