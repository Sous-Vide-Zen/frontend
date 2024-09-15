'use client'

import Image from 'next/image'
import { useCallback, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import styles from './rightbar.module.scss'
import { useAppDispatch, useAppSelector } from '@/store/features/hooks'
import {
  setFilterMode,
  setSortMode,
} from '@/store/features/user/user.slice'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/ui/Button/Button'
import ListViewChanger from '@/components/ui/ListViewChanger/ListViewChanger'

export default function Rightbar() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { sort: sort, filter } = useAppSelector((state) => state.userSettings)
  const { isAuth } = useAuth()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // восстанавливаем параметры поиска (в url) из хранилища
  useEffect(() => {
    let isChanged = false
    const params = new URLSearchParams(searchParams.toString())
    
    if (params.get('sort') !== sort) {
      params.set('sort', sort)
      isChanged = true
    }

    if (isAuth) {
      if (filter && isAuth && params.get('filter') !== filter) {
        params.set('filter', filter)
        isChanged = true
      }
    } else {
      dispatch(setFilterMode(null))
      params.delete('filter')
    }

    router.replace(pathname + '?' + params.toString())
  }, [dispatch, filter, isAuth, pathname, router, searchParams, sort])

  const changeSearchParams = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      value ? params.set(name, value) : params.delete(name)
      router.replace(pathname + '?' + params.toString())
    },
    [pathname, router, searchParams],
  )

  const handleFilterBySubscribe = () => {
    if (isAuth) {
      const what = !filter ? 'subscribe' : null
      dispatch(setFilterMode(what))
      changeSearchParams('filter', what)
    } else {
      alert('Для доступа к этой функции надо авторизоваться')
      dispatch(setFilterMode(null))
      changeSearchParams('filter', null)
    }
  }

  return (
    <div className={styles.rightbar}>
      <div className={styles.publish}>
        <Button
          color="secondary"
          size="big"
          className={sort === 'top' ? styles.active : ''}
          onClick={() => router.push('add-new-recipe')}
        >
          Опубликовать
          <Image
            src="/img/rightbar/plus.png"
            alt="plus"
            width={22}
            height={22}
          />
        </Button>
      </div>
      <ListViewChanger />
      <div className={styles.sort}>
        <h3>Сортировка</h3>
        <div>
          <Button
            color="secondary"
            size="medium"
            className={sort === 'top' ? styles.active : ''}
            onClick={() => {
              dispatch(setSortMode('top'))
              changeSearchParams('sort', 'top')
            }}
          >
            Популярное
          </Button>
          <Button
            color="secondary"
            size="medium"
            className={sort === 'default' ? styles.active : ''}
            onClick={() => {
              dispatch(setSortMode('default'))
              changeSearchParams('sort', 'default')
            }}
          >
            По времени
          </Button>
          <Button
            color="secondary"
            size="medium"
            className={!!filter ? styles.active : ''}
            onClick={handleFilterBySubscribe}
          >
            По подпискам
          </Button>
        </div>
      </div>
      <div className={styles.topRecipe}>
        <h2>Рецепт дня</h2>
        {/*<Image src={} alt={}/>*/}
        <div>
          <div className={styles.zaglushka}></div>
          <span>Тыква с мёдом, чесноком, горчицей и лавровыми листами</span>
        </div>
      </div>
      <div className={styles.topAuthor}>
        <h2>Авторы дня</h2>
        <div className={styles.authors}>
          <div className={styles.author}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#333',
              }}
            ></div>
            <span>username</span>
          </div>
          <div className={styles.author}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#333',
              }}
            ></div>
            <span>username</span>
          </div>
          <div className={styles.author}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#333',
              }}
            ></div>
            <span>username</span>
          </div>
        </div>
      </div>
    </div>
  )
}
