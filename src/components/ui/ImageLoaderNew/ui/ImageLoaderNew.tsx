import styles from './ImageLoaderNew.module.scss';
import { ButtonSimple } from '../../ButtonSimple';
import Cropper, { Area } from 'react-easy-crop';
import { ChangeEvent, useRef, useState } from 'react';
import { RotationElement } from '@/components/ui';

type Props = {
  avatar: string | null;
  onClick: () => void;
  mode: 'avatar' | 'image';
}

const TEXT = {
  title1_avatar: 'Выберите область для маленьких фотографий.',
  title1_image: 'Выберите область для фото превью.',
  title2: 'Если изображение ориентировано неправильно, фотографию можно повернуть.',
};

export const ImageLoaderNew = ({ avatar, onClick, mode }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [curAvatar, setCurAvatar] = useState<string | ArrayBuffer | null>(avatar);
  const triggerFileSelectPopup = () => inputRef?.current?.click();
  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setCurAvatar(reader.result);
        console.log('curAvatar: ', curAvatar);
			});
		}
	};
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  const rotateLeft = () => {
    setRotation(rotation - 5);
  };
  const rotateRight = () => {
    setRotation(rotation + 5);
  };

  const resetState = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  return (
    <div className={styles.imageLoaderNew}>
      <div className={styles.mainWindow}>
        <div className={styles.close}  onClick={onClick} />
        <div className={styles.text}>
          <div>{mode === 'avatar' ? TEXT.title1_avatar : TEXT.title1_image}</div>
          <div>{TEXT.title2}</div>
        </div>
        <div className={styles.canvas}>
          <Cropper
            image={typeof curAvatar === 'string' ? curAvatar : undefined}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape={mode === 'avatar' ? 'round' : 'rect'}
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            objectFit="cover"
            minZoom={1}
            maxZoom={20}
            rotation={rotation}
            style={{ cropAreaStyle: { scale: '0.8', left: '40%', top: '40%' }}}
          />
          {curAvatar &&
            <div className={styles.controls}>
              <RotationElement turn='left' onClick={rotateLeft} />
              <RotationElement turn='right' onClick={rotateRight} />
            </div>
          }
        </div>
        <div className={styles.imgLoaderBtns}>
            <div>
              <input
				    	  type='file'
				    	  accept='image/*'
				    	  ref={inputRef}
				    	  onChange={onSelectFile}
				    	  style={{ display: "none" }}
				      />
              <ButtonSimple text={'Загрузить'} handleClick={triggerFileSelectPopup} />
            </div>
          <ButtonSimple text={'Сохранить и продолжить'} />
          <ButtonSimple text={'Вернуться назад'} handleClick={resetState} />
        </div>
      </div>
    </div>
  )
}
