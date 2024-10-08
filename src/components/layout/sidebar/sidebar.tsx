'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import styles from './sidebar.module.scss'
import { useAppSelector } from '@/store/hooks'
import { useAuth } from '@/hooks/useAuth'
import { LinkItem } from '@/components/ui/NavLink/NavLink'
import { NavLinkSkeleton } from '@/components/ui/Skeletons/skeletons'
import LinkLikeButton from '@/components/ui/LinkLikeButton/LinkLikeButton'

type MenuItem = LinkItem & {
  path: string
  url: string
}

export default function Sidebar() {
  const { isAuth } = useAuth()
  const pathname = usePathname()

  const { sort: sort, filter } = useAppSelector((state) => state.userSettings)

  const homeParams = new URLSearchParams()
  homeParams.set('sort', sort)
  if (filter && homeParams.get('filter') !== filter) {
    homeParams.set('filter', filter)
  }

  const menu: MenuItem[] = [
    {
      text: 'Домой',
      img: '/img/sidebar/home.svg',
      alt: 'home',
      path: '/',
      url: `/?${homeParams.toString()}`,
    },
    {
      text: 'Уведомления',
      img: '/img/sidebar/notifications.svg',
      alt: 'notifications',
      path: '/notifications',
      url: '/notifications',
    },
    {
      text: 'Закладки',
      img: '/img/sidebar/favorites.svg',
      alt: 'favorites',
      path: '/favorites',
      url: '/favorites',
    },
    {
      text: 'Профиль',
      img: '/img/sidebar/user.svg',
      alt: 'profile',
      path: '/profile',
      url: '/profile',
    },
    {
      text: 'Настройки',
      img: '/img/sidebar/settings.svg',
      alt: 'setting',
      path: '/setting',
      url: '/setting',
    },
  ]

  // требуется задержка на получения isAuth, чтобы оно успело обновиться из хранилища после загрузки.
  // и пока таймаут не прошел - рисуем скелетон меню
  const [auth, setAuth] = useState<boolean | undefined>()

  const jsxSkeleton = (
    <div className={styles.auth}>
      <NavLinkSkeleton />
      <NavLinkSkeleton />
      <NavLinkSkeleton />
    </div>
  )

  const jsxIsAuth = (
    <div className={styles.auth}>
      {menu.map(({ text, img, alt, path }, key) => (
        <LinkLikeButton
          key={key}
          color="clear"
          size="medium"
          href={path}
          pressed={pathname === path}
        >
          {text}
          {img && <Image src={img} alt={alt} width={22} height={22} />}
        </LinkLikeButton>
      ))}
    </div>
  )

  const jsxIsNotAuth = (
    <div className={styles.notAuth}>
      <LinkLikeButton color="primary" size="medium" href="login">
        Войти
      </LinkLikeButton>
      <LinkLikeButton color="secondary" size="medium" href="registration">
        Регистрация
      </LinkLikeButton>
    </div>
  )

  useEffect(() => {
    setTimeout(() => {
      setAuth(isAuth)
    }, 300)
  }, [isAuth])

  return (
    <div className={styles.sidebar}>
      {auth === undefined && jsxSkeleton}
      {auth && jsxIsAuth}
      {auth === false && jsxIsNotAuth}

      <div className={styles.more}>
        <p>FAQ</p>
        <p>Правила сайта</p>
        <p>Еще</p>
      </div>

      <div className={styles.mobileApp}>
        <Image
          src="/img/sidebar/mobileapp.png"
          alt="mobile app"
          width={28}
          height={28}
          draggable={false}
        />
        <p>Скачайте мобильное приложение </p>
      </div>
    </div>
  )
}
