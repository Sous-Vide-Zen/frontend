'use client'

import NotificationItem from '../notification-item/notification-item';
import styles from './notifications.module.scss';

export type NotificationItemType = {
  id: string;
  title: string;
  value: boolean;
};

export type NotificationsMockData = {
  title: string;
  items: Array<NotificationItemType>;
};

export const NOTIFICATIONS_MOCK_DATA: NotificationsMockData = {
  title: 'Уведомления',
  items: [
    {id: '001', title: 'На вас подписались', value: false},
    {id: '002', title: 'Ваш рецепт лайкнули', value: true},
    {id: '003', title: 'Ваш рецепт прокомментировали', value: true},
    {id: '004', title: 'Ваш рецепт репостнули', value: true},
    {id: '005', title: 'На ваш комментарий ответили', value: false},
  ]
};

export default function Notifications() {
  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>{NOTIFICATIONS_MOCK_DATA.title}</div>
      <div className={styles.items}>
        {NOTIFICATIONS_MOCK_DATA.items.map((el) => (
          <NotificationItem key={el.id} item={el} />
        ))}
      </div>
    </div>
  )
}
