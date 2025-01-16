import Image from 'next/image'
import styles from './avatarImage.module.scss'
import { Button } from '@/components/ui'
import { useState } from 'react'
import { ImageLoaderNew } from '../imageLoaderNew/ImageLoaderNew'

type Props = {
  avatar: string | undefined;
}

export const AvatarImage = ({ avatar }: Props) => {
  const [isAvatarMode, setIsAvatarMode] = useState(false);

  const handleSetAvatar = () => {
    setIsAvatarMode(!isAvatarMode);
    console.log('handleSetAvatar, isAvatarMode: ', isAvatarMode);
  }
  return (
    <div className={styles.container}>
      {avatar
        ? <div
            className={styles.changeAvatar}
            onClick={handleSetAvatar}
          >
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
        : <Button
            size="medium"
            color="secondary"
            onClick={handleSetAvatar}
          >
            Добавить фото +
          </Button>
      }
      {isAvatarMode && (
        <ImageLoaderNew handleSetAvatar={handleSetAvatar} avatar={avatar} />
      )}
    </div>
  )
}
