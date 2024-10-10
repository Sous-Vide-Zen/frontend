'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import styles from './rightbar.module.scss'
import { useAppDispatch, useAppSelector } from '@/store/features/hooks'
import { setSortMode } from '@/store/features/recipes/recipes.slice'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/ui/Button/Button'
import ListViewChanger from '@/components/ui/ListViewChanger/ListViewChanger'

export default function Rightbar() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { sort } = useAppSelector((state) => state.recipesFeed)
  const { isAuth } = useAuth()

  const handleSortBySubscribe = () => {
    if (isAuth) {
      dispatch(setSortMode('subscribe'))
    } else {
      alert('Для доступа к этой функции надо авторизоваться')
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
            onClick={() => dispatch(setSortMode('top'))}
          >
            Популярное
          </Button>
          <Button
            color="secondary"
            size="medium"
            className={sort === 'default' ? styles.active : ''}
            onClick={() => dispatch(setSortMode('default'))}
          >
            По времени
          </Button>
          <Button
            color="secondary"
            size="medium"
            className={sort === 'subscribe' ? styles.active : ''}
            onClick={handleSortBySubscribe}
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
