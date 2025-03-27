import React from 'react'
import styles from './badge.module.scss'
import Image from 'next/image'

type BadgeProps = {
  count: number
  imgSrc: string
  altText: string
}

const Badge: React.FC<BadgeProps> = ({ count, imgSrc, altText }) => {
  return (
    <div className={styles.badgeContainer}>
      <Image
        src={imgSrc}
        priority={true}
        width={22}
        height={22}
        alt={altText}
        className={styles.badgeImage}
      />
      {count > 0 && (
        <div className={styles.badgeCount}>
          <span className={styles.plusSign}>+</span>
          <span>{count}</span>
        </div>
      )}
    </div>
  )
}

export default Badge
