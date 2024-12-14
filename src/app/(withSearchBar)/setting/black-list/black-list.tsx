'use client'

import NotificationItem from '../notification-item/notification-item';
import avatar1 from '../../../../../public/img/settings/avatar_1.png';
import avatar2 from '../../../../../public/img/settings/avatar_2.png';
import avatar3 from '../../../../../public/img/settings/avatar_3.png';
import avatar4 from '../../../../../public/img/settings/avatar_4.png';
import styles from './black-list.module.scss';
import { StaticImageData } from 'next/image';
import BlacklistItem from '../blacklist-item/blacklist-item';

export type BlacklistItemType = {
  id: string;
  avatarImg: StaticImageData;
  name: string;
  action: string;
  comment?: {
    title: string;
    text: string;
  };
};

export type BlacklistMockData = {
  title: string;
  items: Array<BlacklistItemType>;
};

export const BLACKLIST_MOCK_DATA: BlacklistMockData = {
  title: 'Черный список',
  items: [
    {
      id: '001',
      avatarImg: avatar1,
      name: 'Илья Антонов',
      action: 'Убрать из списка',
      comment: {
        title: 'Комментарий',
        text: 'Ставит мне всегда только негативные реакции'
      }
    },
    {
      id: '002',
      avatarImg: avatar2,
      name: 'Светлана Орлова',
      action: 'Убрать из списка',
    },
    {
      id: '003',
      avatarImg: avatar3,
      name: 'Алена Зуева',
      action: 'Убрать из списка',
    },
    {
      id: '004',
      avatarImg: avatar4,
      name: 'Павел Ульев',
      action: 'Убрать из списка',
      comment: {
        title: 'Комментарий',
        text: 'В комментариях часто навязывает мне своё видение моих рецептов'
      }
    }
  ]
};

export default function BlackList() {
  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>{BLACKLIST_MOCK_DATA.title}</div>
      <div className={styles.items}>
        {BLACKLIST_MOCK_DATA.items.map((el) => (
          <BlacklistItem key={el.id} item={el} />
        ))}
      </div>
    </div>
  )
}
