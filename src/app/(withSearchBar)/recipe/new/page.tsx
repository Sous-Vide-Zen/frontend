'use client'

import styles from '../mutationRecipe.module.scss'
import NewRecipe from '@/components/ui/Recipe/NewRecipe'
import Rightbar from '@/components/layout/rightbar/rightbar'

export default function NewRecipePage() {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.wrapper} scroll scroll--left scroll__thin`}
        id="wrapper"
      >
        <NewRecipe />
      </div>
      <Rightbar showListViewButtons={false} showSortButtons={false} />
    </div>
  )
}
