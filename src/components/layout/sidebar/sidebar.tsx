'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import styles from './sidebar.module.scss'
import { useAuth } from '@/hooks/useAuth'
import { LinkItem, NavLinkSkeleton, LinkLikeButton } from '@/components/ui'
import ButtonLikeLink from '@/components/ui/ButtonLikeLink'
import Badge from '@/components/ui/Badge'

type MenuItem = LinkItem & {
  path: string
  url: string
}

export default function Sidebar() {
  const { isAuth } = useAuth()
  const pathname = usePathname()

  const menu: MenuItem[] = [
    {
      text: 'Домой',
      img: '/img/sidebar/home.svg',
      alt: 'home',
      path: '/',
      url: '/',
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

  // const jsxIsAuth = (
  //   <div className={styles.auth}>
  //     {menu.map(({ text, img, alt, path }, key) => (
  //       <LinkLikeButton
  //         key={key}
  //         color="clear"
  //         size="medium"
  //         href={path}
  //         pressed={pathname === path}
  //       >
  //         {text}
  //         {img && <Image src={img} alt={alt} width={22} height={22} />}
  //       </LinkLikeButton>
  //     ))}
  //   </div>
  // )

  const notificationsCount = 1 // Это число должно быть динамическим, например, из состояния или пропсов

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
          {path === '/notifications' ? (
            img ? ( // Проверка на наличие изображения
              <Badge count={notificationsCount} imgSrc={img} altText={alt} />
            ) : (
              <span>No image</span> // Или любой другой обработчик на случай отсутствия изображения
            )
          ) : (
            img && <Image src={img} alt={alt} width={22} height={22} />
          )}
        </LinkLikeButton>
      ))}
    </div>
  )

  const jsxIsNotAuth = (
    <div className={styles.notAuth}>
      <LinkLikeButton color="primary" size="medium" href="login">
        Вход
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
        <LinkLikeButton color="clear" size="medium" href="/error404">
          FAQ
        </LinkLikeButton>
        <LinkLikeButton color="clear" size="medium" href="/error404">
          Правила сайта
        </LinkLikeButton>
        <ButtonLikeLink text={'Ещё'} />
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
