import { FC, PropsWithChildren } from 'react'
import styles from '../recipeLayouts.module.scss'

const RecipeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children} <div>{/* пустое место для второй колонки */}</div>
    </div>
  )
}

export default RecipeLayout
