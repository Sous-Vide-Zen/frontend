'use client'

import { FC } from 'react'
import styles from './NavLink.module.scss'
import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

export type LinkItem = {
  text: string
  img?: string
  alt: string
}

type Props = LinkItem & {
  url: string
  active?: boolean
  width?: number
  height?: number
}

export const NavLink: FC<Props> = ({
  text,
  url,
  img,
  alt,
  active,
  width = 22,
  height = 22,
}) => {
  return (
    <>
      <Link
        className={cn(styles.link, {
          [styles.active]: active === true,
        })}
        href={url}
      >
        <p>{text}</p>
        {img && <Image src={img} alt={alt} width={width} height={height} />}
      </Link>
    </>
  )
}

export default NavLink
