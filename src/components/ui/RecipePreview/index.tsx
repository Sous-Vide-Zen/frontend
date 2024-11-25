'use client'

import { FC } from 'react'
import styles from './RecipePreview.module.scss'

type Props = {
  img?: string
  username?: string
}

const RecipePreview: FC<Props> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.zaglushka}>Фото отсутствует</div>
      <span>Тыква с мёдом, чесноком, горчицей и лавровыми листами</span>
    </div>
  )
}

export default RecipePreview
