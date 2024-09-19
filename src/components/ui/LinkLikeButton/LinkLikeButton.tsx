import { FC, ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cn from 'clsx'

import styles from './LinkLikeButton.module.scss'

interface Props {
  href: string
  children: ReactNode
  color?: 'purple' | 'white' | 'gray' | 'primary' | 'secondary' | 'clear'
  size?: 'big' | 'medium' | 'small'
  className?: string
  pressed?: boolean
  loading?: boolean
}

const LinkLikeButton: FC<Props> = ({
  href,
  children,
  className,
  color,
  size,
  pressed,
  loading,
  ...props
}) => {
  const linkClasses = cn(styles.link, className, {
    [styles.primary]: color === 'primary',
    [styles.secondary]: color === 'secondary',
    [styles.clear]: color === 'clear',
    [styles.big]: size === 'big',
    [styles.medium]: size === 'medium',
    [styles.small]: size === 'small',
    [styles.pressed]: pressed === true,
  })

  return (
    <Link {...props} className={linkClasses} href={href}>
      {loading ? (
        <Image
          src="/img/loader.svg"
          alt="loader"
          width={30}
          height={30}
          draggable={false}
          priority
        />
      ) : (
        children
      )}
    </Link>
  )
}

export default LinkLikeButton
