import { FC, PropsWithChildren, Suspense } from 'react'
import styles from '../recipeLayouts.module.scss'
import { Skeleton } from '@/components/ui/Skeletons'

const RecipeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Skeleton />}>{children}</Suspense>
      <div>{/* пустое место для второй колонки */}</div>
    </div>
  )
}

export default RecipeLayout
