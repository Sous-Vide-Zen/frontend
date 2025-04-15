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
import { useGetRecipeDraftsQuery } from '@/store/features/recipes/recipes.actions'

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
  const [isModalDraft, setIsModalDraft] = useState(false)

  // Восстановление параметров поиска (в url) из стейта
  useEffect(() => {
    let isChanged = false
    const params = new URLSearchParams(searchParams.toString())

    /* Если параметр сортировки отсутствует или равен "default",
       устанавливаем его на "top" (популярное). */
    if (!params.get('sort') || params.get('sort') === 'default') {
      params.set('sort', 'top')
      isChanged = true
    }

    if (isAuth) {
      if (filter && isAuth && params.get('filter') !== filter) {
        params.set('filter', filter)
        isChanged = true
      }
      if (filter === 'subscribe' && params.get('sort') !== 'default') {
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

  // const handleFilterBySubscribe = () => {
  //   if (isAuth) {
  //     const currentFilter = filter === 'subscribe' ? null : 'subscribe'
  //     dispatch(setFilterMode(currentFilter))
  //     changeSearchParams('filter', currentFilter)
  //   } else {
  //     setIsModalOpen(true)
  //     dispatch(setFilterMode(null))
  //     changeSearchParams('filter', null)
  //   }
  // }

  const {
    data: drafts,
    error: draftsError,
    isLoading: draftsLoading,
  } = useGetRecipeDraftsQuery()

  const handlePublish = () => {
    const quantityDraft = drafts?.length || 0
    if (!isAuth) {
      setIsModalOpen(true)
    } else if (quantityDraft >= 3) {
      setIsModalDraft(true)
    } else {
      router.push('/recipe/new')
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
              className={`${sort === 'top' ? 'highlighted green-border' : ''}`}
              color="secondary"
              size="medium"
              pressed={sort === 'top'}
              onClick={() => {
                if (sort === 'top' && !filter) return
                dispatch(setSortMode('top'))
                changeSearchParams('sort', 'top')
                if (filter) {
                  dispatch(setFilterMode(null)) // Сбрасываем фильтр при выборе другой сортировки
                  changeSearchParams('filter', null)
                }
              }}
            >
              Популярное
            </Button>
            <Button
              color="secondary"
              size="medium"
              pressed={sort === 'default' && !filter}
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
              onClick={() => {
                if (filter) return // Учитываем наличие фильтра
                dispatch(setFilterMode('subscribe')) // Устанавливаем фильтр на подписки
                changeSearchParams('filter', 'subscribe')
                if (sort !== 'default') {
                  dispatch(setSortMode('default')) // Меняем сортировку на "по времени" при выборе фильтра
                  changeSearchParams('sort', 'default')
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
      <Modal isOpen={isModalDraft} onClose={() => setIsModalDraft(false)}>
        <p>У вас уже есть начатые рецепты. Хотите перейти к ним?</p>
        <div className={styles.modal_btns}>
          <div className={styles.modal_login}>
            <LinkLikeButton color="primary" size="big" href="/profile">
              Перейти к черновикам
            </LinkLikeButton>
          </div>
          <div className={styles.modal_registration}>
            <LinkLikeButton color="secondary" size="big" href="/profile">
              Создать новый рецепт
            </LinkLikeButton>
          </div>
        </div>
        <div />
      </Modal>
    </div>
  )
}

export default Rightbar
