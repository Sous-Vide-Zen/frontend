'use client'

import { useState } from 'react';
import { NotificationItemType } from '../notifications/notifications';
import styles from './notification-item.module.scss';
import NotificationCheckbox from '../notification-checkbox/notification-checkbox';

type NotificationItemProps = {
  item: NotificationItemType;
};

export default function NotificationItem({ item }: NotificationItemProps) {
  const [checkBox, setCheckbox] = useState(item.value);

  const handleClick = () => setCheckbox(!checkBox);

  return (
    <div className={styles.item}>
      <div className={styles.itemTitle}>{item.title}</div>
      <NotificationCheckbox value={checkBox} onClick={handleClick} />
    </div>
  )
}
