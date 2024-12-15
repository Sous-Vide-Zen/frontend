'use client'

import styles from './notification-checkbox.module.scss';

type NotificationCheckboxProps = {
  value: boolean;
  onClick: () => void;
};

export default function NotificationCheckbox({ value, onClick }: NotificationCheckboxProps) {
  const curStyle = () => value
    ? `${styles.checkBoxOn}`
    : `${styles.checkBoxOff}`

  return (
    <div className={curStyle()} onClick={onClick} >
      <div className={styles.ball} />
    </div>
  )
}
