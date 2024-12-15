'use client'

import { NotificationsPageItemType } from '../page';
import styles from './notifications-page-item.module.scss';
import Image from 'next/image';

type NotificationsPageItemProps = {
  item: NotificationsPageItemType;
};

export default function NotificationsPageItem({ item }: NotificationsPageItemProps) {
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
          <div className={styles.userText}>
            {item.text}
          </div>
        </div>
        {item.answer
          ? <div className={styles.unreadMessages}/>
          : <div className={styles.userAction}>
              {item.action}
            </div>
        }
      </div>
      <div className={styles.time}>
        <div className={styles.timeValue}>
          {item.date}
        </div>
      </div>
    </div>
  )
}
