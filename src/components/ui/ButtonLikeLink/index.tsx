'use client'

import Image from 'next/image';

import styles from './ButtonLikeLink.module.scss';
import { useState } from 'react';

type ButtonLikeLinkProps = {
  text: string;
};

type MenuItemType = {
  id: string;
  value: string;
};
type CurItemType = Array<MenuItemType>;

const curItems: CurItemType = [
  {id: "001", value: 'Политика конфиденциальности'},
  {id: "002", value: 'Пользовательское соглашение'},
  {id: "003", value: 'Правила применения рекомендательных технологий'},
  {id: "004", value: 'Стать модератором сайта'},
  {id: "005", value: 'Сообщить об ошибке'}
];

export default function ButtonLikeLink({ text }: ButtonLikeLinkProps) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleClick = () => setIsMenuVisible(!isMenuVisible);

  const closeMenu = () => setIsMenuVisible(false);

  return (
    <div className={styles.buttonLikeLink}>
      <div className={styles.hoverArea} onClick={handleClick}>
        <p className={styles.underlineText}>{text}</p>
        <Image
          src="/img/arrow-up.svg"
          alt="mobile app"
          width={14}
          height={14}
        />
      </div>
      {isMenuVisible &&
        <div className={styles.hiddenMenu} onMouseLeave={closeMenu}>
          {curItems.map((el) => (
            <div key={el.id} className={styles.underlineTextSmall}>{el.value}</div>
          ))}
        </div>
      }
    </div>
  )
}
