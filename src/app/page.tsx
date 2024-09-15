'use client'

import styles from './page.module.scss'
import { useAppSelector } from '@/store/features/hooks'
import { useRecipes } from '@/hooks/useRecipes'
import Layout from '@/components/layout/layout'
import RecipeList from '@/components/ui/RecipeList/RecipeList'
import Rightbar from '@/components/layout/rightbar/rightbar'

export default function Home() {
  const { view, sort, filter } = useAppSelector((state) => state.userSettings)
  const ordering = sort === 'top' ? '-activity_count' : undefined

  return (
    <Layout isSearch={true}>
      <div className={styles.container}>
        <div
          className={`${styles.recipes} scroll scroll--left scroll__thin`}
          id="wrapper"
        >
          {/* div нужен для предотвращения зеркалирования компонента (если есть скрол слева у parent) при ошибке загрузки с сервера */}
          <div>
            <RecipeList
              dispatcher={useRecipes('feed', { ordering, filter })}
              view={view}
            />
          </div>
        </div>
        <Rightbar />
      </div>
    </Layout>
  )
}
