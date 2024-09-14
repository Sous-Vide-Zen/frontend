'use client'

import React, { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from './avatar.module.scss'
import PopupArrow from '@/components/ui/PopupArrow/PopupArrow'
import { useAuth } from '@/hooks/useAuth'

const Avatar: FC = () => {
  const { isAuth } = useAuth()

  const AuthMenu = <Link href="/logout">Выйти</Link>

  const NoAuthMenu = (
    <ul className={styles.menuList}>
      <li>
        <Link href="/registration">Зарегистрироваться</Link>
      </li>
      <li>
        <Link href="/login">Войти</Link>
      </li>
    </ul>
  )

  return (
    <PopupArrow
      position="bottom"
      tooltipStyles={{
        minWidth: '140px',
        textAlign: 'left',
        fontSize: 16,
      }}
      Content={() => (
        // todo сделвть доступным для управления с клавиатуры
        <Image
          className={styles.profile}
          src="/img/profile.png"
          width={30}
          height={30}
          alt="profile"
          draggable={false}
        />
      )}
      Tooltip={() => (isAuth ? AuthMenu : NoAuthMenu)}
    />
  )
}

export default Avatar
