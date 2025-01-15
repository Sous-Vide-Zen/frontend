import Image from 'next/image'
import styles from './avatarImage.module.scss'
import { Button } from '@/components/ui'

type Props = {
  avatar: string | undefined
}

export const AvatarImage = ({ avatar }: Props) => {
  const handleSetAvatar = () => {
    console.log('handleSetAvatar');
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
              />
            <div className={styles.text}>Изменить миниатюру</div>
          </div>
        : <Button
            size="medium"
            color="secondary"
            onClick={handleSetAvatar}
          >
            Добавить фото +
          </Button>
      }
      {/* <Button
        // className={styles.addPhoto}
        size="medium"
        color="secondary"
        // onClick={handlePick}
      >
        Добавить фото +
      </Button> */}

      {/* скрытый блок превью картинки */}
      {/* <div className={styles.previewPhoto}>
            <Controller
              control={control}
              name="avatar"
              render={({ field }) => (
                <input
                  className={styles.hidden}
                  {...field}
                  ref={ref}
                  type="file"
                  onChange={saveFiles}
                  accept="image/*,.png,.jpg"
                />
              )}
            />
            <Button
              className={styles.addPhoto}
              size={'medium'}
              color={'primary'}
              onClick={handlePick}
            >
              Добавить фото +
            </Button>
            {previewUrl && (
              <Image
                className={styles.img}
                src={previewUrl}
                alt="Preview"
                width={150}
                height={150}
              />
            )}
          </div> */}
    </div>
  )
}
