import Image from 'next/image'
import styles from './avatarImage.module.scss'
import { Button, ImageLoaderNew } from '@/components/ui'
import { useState } from 'react'

type Props = {
  avatar: string | null
}

export const AvatarImage = ({ avatar }: Props) => {
  const [isAvatarMode, setIsAvatarMode] = useState(false)

  const handleSetAvatar = () => {
    setIsAvatarMode(!isAvatarMode)
  }
  return (
    <div className={styles.container}>
      {avatar ? (
        <div className={styles.changeAvatar} onClick={handleSetAvatar}>
          <Image
            src={avatar}
            priority={true}
            width={150}
            height={150}
            alt="user avatar"
            className={styles.avatar}
          />
          <div className={styles.text}>Изменить миниатюру</div>
          <div className={styles.imgLayer}>
            <div className={styles.setAvatar} />
          </div>
        </div>
      ) : (
        <div className={styles.addImageContainer}>
          <div className={styles.addPhotoContainer} onClick={handleSetAvatar}>
            <div className={styles.setAvatar}></div>
            <p className={styles.text}>Изменить миниатюру</p>
          </div>
        </div>
      )}
      {isAvatarMode && (
        <ImageLoaderNew
          onClick={handleSetAvatar}
          avatar={avatar}
          mode="avatar"
        />
      )}
    </div>
  )
}
