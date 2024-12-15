'use client'

import { StaticImageData } from 'next/image';
import avatar1 from '/public/img/notifications/avatar_1.png';
import avatar2 from '/public/img/notifications/avatar_2.png';
import avatar3 from '/public/img/notifications/avatar_3.png';
import avatar4 from '/public/img/notifications/avatar_4.png';
import avatar5 from '/public/img/notifications/avatar_5.png';
import avatar6 from '/public/img/notifications/avatar_6.png';
import styles from './notifications-page.module.scss'
import NotificationsPageItem from './notifications-page-item/notifications-page-item';

export type NotificationsPageItemType = {
  id: string;
  avatarImg: StaticImageData;
  name: string;
  action: string;
  text: string;
  date: string;
  answer?: boolean;
};

export type NotificationsPageMockData = {
  title: string;
  newMessages: {
    title: string;
    number: number;
  };
  items: Array<NotificationsPageItemType>;
};

export const NOTIFICATIONS_PAGE_MOCK_DATA: NotificationsPageMockData = {
  title: 'Уведомления',
  newMessages: {
    title: 'Новые',
    number: 2
  },
  items: [
    {
      id: '001',
      avatarImg: avatar1,
      name: 'Нина По',
      action: 'удалить',
      text: 'ответил на ваш комментарий',
      date: '2 ч. назад',
      answer: true
    },
    {
      id: '002',
      avatarImg: avatar2,
      name: 'Евгений Антонов',
      action: 'удалить',
      text: 'поставил реакцию вашему рецепту',
      date: '6 ч. назад',
      answer: false
    },
    {
      id: '003',
      avatarImg: avatar3,
      name: 'Диана Сохранова',
      action: 'удалить',
      text: 'сохранил ваш рецепт в закладки',
      date: '12.12.2024',
      answer: false
    },
    {
      id: '004',
      avatarImg: avatar4,
      name: 'Эмиль',
      action: 'удалить',
      text: 'подписался на вас',
      date: '12.12.2024',
      answer: false
    },
    {
      id: '005',
      avatarImg: avatar5,
      name: 'Зоя Ерминина',
      action: 'удалить',
      text: 'сделал репост вашего рецепта',
      date: '09.06.2024',
      answer: false
    },
    {
      id: '006',
      avatarImg: avatar6,
      name: 'Имя пользователя',
      action: 'удалить',
      text: 'оставил комментарий вашему рецепту',
      date: '09.06.2024',
      answer: false
    }
  ]
};

export default function NotificationsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <div className={styles.title}>
          {NOTIFICATIONS_PAGE_MOCK_DATA.title}
        </div>
        <div className={styles.newLetters}>
          {`${NOTIFICATIONS_PAGE_MOCK_DATA.newMessages.title} (${NOTIFICATIONS_PAGE_MOCK_DATA.newMessages.number})`}
        </div>
      </div>
      <div className={styles.items}>
        {NOTIFICATIONS_PAGE_MOCK_DATA.items.map((el) => (
          <NotificationsPageItem key={el.id} item={el} />
        ))}
      </div>
    </div>
  )
}
