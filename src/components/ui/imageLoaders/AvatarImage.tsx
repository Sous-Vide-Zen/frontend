import styles from './avatarImage.module.scss'
import Button from '../Button/Button'

export const AvatarImage = () => {
  return (
    <div className={styles.container}>
      <Button
        // className={styles.addPhoto}
        size="medium"
        color="secondary"
        // onClick={handlePick}
      >
        Добавить фото +
      </Button>

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
