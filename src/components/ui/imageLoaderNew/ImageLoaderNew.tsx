import styles from './ImageLoaderNew.module.scss';
import { ButtonSimple } from '../ButtonSimple';

type Props = {
  avatar: string | undefined;
  handleSetAvatar: () => void;
}

export const ImageLoaderNew = ({ avatar, handleSetAvatar }: Props) => {
  return (
    <div className={styles.imageLoaderNew}>
      <div className={styles.mainWindow}>
        <div className={styles.close}  onClick={handleSetAvatar} />
        <div className={styles.text}>
          <div>Выберите область для маленьких фотографий.</div>
          <div>Если изображение ориентировано неправильно, фотографию можно повернуть.</div>
        </div>
        <div className={styles.canvas}></div>
        <div className={styles.imgLoaderBtns}>
          <ButtonSimple text={'Загрузить'} />
          <ButtonSimple text={'Сохранить и продолжить'} />
          <ButtonSimple text={'Вернуться назад'} />
        </div>
      </div>
    </div>
  )
}
