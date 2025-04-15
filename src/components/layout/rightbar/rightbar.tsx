'use client'

import Image from 'next/image'
import { FC, useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import styles from './rightbar.module.scss'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSortMode } from '@/store/features/user/user.slice'
import { useAuth } from '@/hooks/useAuth'
import { RecipeListOrdering } from '@/hooks/dispatcher.types'
import { Button, LinkLikeButton } from '@/components/ui'
import ListViewChanger from '@/components/ui/ListViewChanger/ListViewChanger'
import DayRecipe from '@/components/ui/DayRecipe'
import TopAuthor from '@/components/ui/TopAuthor'
import { Modal } from '@/components/ui/Modal'
import { LoginOrRegisterModal } from '@/components/ui/LoginOrRegisterModal'

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
  const { sort } = useAppSelector((state) => state.userSettings)
  const { isAuth } = useAuth()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Восстановление параметров поиска (в url) из стейта
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const sortMode = params.get('sort')

    switch (sortMode) {
      case 'top':
      case 'default':
        break
      case 'subscribe': {
        console.log('subscribe', isAuth)

        if (!isAuth) {
          params.set('sort', 'top')
          router.replace(pathname + '?' + params.toString())
          dispatch(setSortMode('top'))
        }
        break
      }

      /* Если параметр сортировки отсутствует,
       устанавливаем его на "top" (популярное). */
      default:
        const newSort = sort ?? 'top'
        params.set('sort', newSort)
        router.replace(pathname + '?' + params.toString())
        dispatch(setSortMode(newSort))
    }
  }, [dispatch, isAuth, pathname, router, searchParams, sort])

  const changeSortMode = useCallback(
    (mode: RecipeListOrdering) => {
      console.log('set', mode)

      dispatch(setSortMode(mode))
      const params = new URLSearchParams(searchParams.toString())
      params.set('sort', mode)
      console.log('new params', params.toString())

      router.replace(pathname + '?' + params.toString())
    },
    [dispatch, pathname, router, searchParams],
  )

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
        <Button color="primary" size="big" onClick={handlePublish}>
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
                if (sort !== 'top') changeSortMode('top')
              }}
            >
              Популярное
            </Button>
            <Button
              color="secondary"
              size="medium"
              pressed={sort === 'default'}
              onClick={() => {
                if (sort !== 'default') changeSortMode('default')
              }}
            >
              По времени
            </Button>

            <Button
              color="secondary"
              size="medium"
              pressed={sort === 'subscribe'}
              onClick={() => {
                if (sort === 'subscribe') return
                if (isAuth) {
                  changeSortMode('subscribe')
                } else {
                  setIsModalOpen(true)
                }
              }}
            >
              По подпискам
            </Button>
          </div>
        </div>
      )}
      <DayRecipe />
      <TopAuthor />
      <LoginOrRegisterModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  )
}

export default Rightbar
