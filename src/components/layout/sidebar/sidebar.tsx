'use client'
import { useAuth } from '@/hooks/useAuth'
import styles from './sidebar.module.scss'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import cn from 'clsx'

export default function Sidebar() {
  const { isAuth } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className={styles.sidebar}>
      {isAuth ? (
        <div className={styles.auth}>
          {/* 
          WIP. для WCAG лучше делать линками, 
          todo: сделать отдельный коспонент для пункта меню 
          */}
          {/* <Link className={styles.link} href="/">
            <p>Домой</p>
            <Image
              src={
                pathname === '/'
                  ? '/img/sidebar/active/home.png'
                  : '/img/sidebar/home.png'
              }
              alt="home"
              width={22}
              height={22}
            />
          </Link> */}
          <button
            className={cn(styles.buttons, {
              [styles.active]: pathname === '/',
            })}
            onClick={() => router.push('/')}
          >
            <p>Домой</p>
            <Image
              src={
                pathname === '/'
                  ? '/img/sidebar/active/home.png'
                  : '/img/sidebar/home.png'
              }
              alt="home"
              width={22}
              height={22}
            />
          </button>
          <button
            className={cn(styles.buttons, {
              [styles.active]: pathname === '/notification',
            })}
            onClick={() => router.push('/notifications')}
          >
            <p>Уведомления</p>
            <Image
              src={
                pathname === '/notifications'
                  ? '/img/sidebar/active/notification.png'
                  : '/img/sidebar/notification.png'
              }
              alt="home"
              width={22}
              height={22}
            />
          </button>
          <button
            className={cn(styles.buttons, {
              [styles.active]: pathname === '/favorites',
            })}
            onClick={() => router.push('/favorites')}
          >
            <p>Закладки</p>
            <Image
              src={
                pathname === '/favorites'
                  ? '/img/sidebar/active/save.png'
                  : '/img/sidebar/save.png'
              }
              alt="home"
              width={22}
              height={22}
            />
          </button>
          <button
            className={cn(styles.buttons, {
              [styles.active]: pathname === '/profile',
            })}
            onClick={() => router.push('/profile')}
          >
            <p>Профиль</p>
            <Image
              src={
                pathname === '/profile'
                  ? '/img/sidebar/active/profile.png'
                  : '/img/sidebar/profile.png'
              }
              alt="home"
              width={22}
              height={22}
            />
          </button>
          <button
            className={cn(styles.buttons, {
              [styles.active]: pathname === '/setting',
            })}
            onClick={() => router.push('/setting')}
          >
            <p>Настройки</p>
            <Image
              src={
                pathname === '/setting'
                  ? '/img/sidebar/active/setting.png'
                  : '/img/sidebar/setting.png'
              }
              alt="home"
              width={22}
              height={22}
            />
          </button>
          <hr className={styles.hr} />
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
      ) : (
        <div className={styles.notAuth}>
          <button
            className={styles.button}
            onClick={() => router.push('activate-page')}
          >
            Войти
          </button>
          <button
            className={styles.button}
            onClick={() => router.push('registration')}
          >
            Регистрация
          </button>
          <hr className={styles.hr} />
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
      )}
    </div>
  )
}
