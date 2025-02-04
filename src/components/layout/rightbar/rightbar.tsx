'use client'

import Image from 'next/image'
import { FC, useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import styles from './rightbar.module.scss'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setFilterMode, setSortMode } from '@/store/features/user/user.slice'
import { useAuth } from '@/hooks/useAuth'
import { Button, LinkLikeButton } from '@/components/ui'
import ListViewChanger from '@/components/ui/ListViewChanger/ListViewChanger'
import DayRecipe from '@/components/ui/DayRecipe'
import TopAuthor from '@/components/ui/TopAuthor'
import { Modal } from '@/components/ui/Modal'

type Props = {
  showListViewButtons?: boolean
  showSortButtons?: boolean
}

const Rightbar: FC<Props> = ({
  showListViewButtons = true,
  showSortButtons = true,
}) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { sort, filter } = useAppSelector((state) => state.userSettings)
  const { isAuth } = useAuth()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // восстанавливаем параметры поиска (в url) из стейта
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
      setIsModalOpen(true)
      dispatch(setFilterMode(null))
      changeSearchParams('filter', null)
    }
  }

  const handlePublish = () => {
    if (isAuth) {
      router.push('/recipe/new')
    } else {
      setIsModalOpen(true)
    }
  }

  return (
    <div className={styles.rightbar}>
      <div className={styles.publish}>
        <Button
          color="primary"
          size="big"
          onClick={handlePublish}
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

      {showListViewButtons && <ListViewChanger />}

      {showSortButtons && (
        <div className={styles.sort}>
          <h3>Сортировка</h3>
          <div>
            <Button
              color="secondary"
              size="medium"
              pressed={sort === 'top'}
              onClick={() => {
                if (sort === 'top') return
                dispatch(setSortMode('top'))
                changeSearchParams('sort', 'top')
              }}
            >
              Популярное
            </Button>
            <Button
              color="secondary"
              size="medium"
              pressed={sort === 'default'}
              onClick={() => {
                if (sort === 'default') return
                dispatch(setSortMode('default'))
                changeSearchParams('sort', 'default')
              }}
            >
              По времени
            </Button>
            <Button
              color="secondary"
              size="medium"
              pressed={!!filter}
              onClick={handleFilterBySubscribe}
            >
              По подпискам
            </Button>
          </div>
        </div>
      )}

      <DayRecipe />
      <TopAuthor />

      {}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>
          Войдите или зарегистрируйтесь, чтобы создавать собственные рецепты и
          оценивать рецепты других пользователей.
        </p>
        <div className={styles.modal_btns}>
          <div className={styles.modal_login}>
            <LinkLikeButton color="primary" size="big" href="/login">
              Вход
            </LinkLikeButton>
          </div>
          <div className={styles.modal_registration}>
            <LinkLikeButton color="secondary" size="big" href="/registration">
              Регистрация
            </LinkLikeButton>
          </div>
        </div>
        <div />
      </Modal>
    </div>
  )
}

export default Rightbar
