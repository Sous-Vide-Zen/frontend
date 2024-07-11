'use client'
import { useAuth } from '@/hooks/useAuth'
import styles from './sidebar.module.scss'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import NavLink, { LinkItem } from '@/components/ui/NavLink/NavLink'
import { useEffect, useState } from 'react'
import { NavLinkSkeleton } from '@/components/ui/Skeletons/skeletons'

type MenuItem = LinkItem & {
  path: string
}

const menu: MenuItem[] = [
  {
    text: 'Домой',
    img: '/img/sidebar/home.svg',
    alt: 'home',
    path: '/',
  },
  {
    text: 'Уведомления',
    img: '/img/sidebar/notifications.svg',
    alt: 'notifications',
    path: '/notifications',
  },
  {
    text: 'Закладки',
    img: '/img/sidebar/favorites.svg',
    alt: 'favorites',
    path: '/favorites',
  },
  {
    text: 'Профиль',
    img: '/img/sidebar/user.svg',
    alt: 'profile',
    path: '/profile',
  },
  {
    text: 'Настройки',
    img: '/img/sidebar/settings.svg',
    alt: 'setting',
    path: '/setting',
  },
  {
    text: 'logout',
    alt: 'logout',
    path: '/logout',
  },
]

export default function Sidebar() {
  const { isAuth } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

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
        <NavLink
          key={key}
          text={text}
          img={img}
          alt={alt}
          url={path}
          active={pathname === path}
        />
      ))}
    </div>
  )

  const jsxIsNotAuth = (
    <div className={styles.notAuth}>
      <button className={styles.button} onClick={() => router.push('login')}>
        Войти
      </button>
      <button
        className={styles.button}
        onClick={() => router.push('registration')}
      >
        Регистрация
      </button>
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
