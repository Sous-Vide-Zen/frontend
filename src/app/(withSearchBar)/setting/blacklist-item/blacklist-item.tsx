'use client'

import styles from './blacklist-item.module.scss';
import { BlacklistItemType } from '../black-list/black-list';
import Image from 'next/image';

type BlacklistItemProps = {
  item: BlacklistItemType;
};

export default function BlacklistItem({ item }: BlacklistItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.user}>
        <div className={styles.userInfo}>
          <Image
            src={item.avatarImg}
            alt=""
            role="presentation"
				  	className={styles.avatarImg}
          />
          <div className={styles.userName}>
            {item.name}
          </div>
        </div>
        <div className={styles.userAction}>
          {item.action}
        </div>
      </div>
      {item.comment &&
        <div className={styles.comment}>
          <div className={styles.title}>
            {item.comment.title}
          </div>
          <div className={styles.text}>
            {item.comment.text}
          </div>
        </div>
      }
    </div>
  )
}
