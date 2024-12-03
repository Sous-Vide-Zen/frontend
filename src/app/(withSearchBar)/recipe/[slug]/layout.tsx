import { FC, PropsWithChildren, Suspense } from 'react'
import styles from '../recipe.module.scss'
import { RecipeSkeletonWithRightbar } from '@/components/ui/Skeletons'

const RecipeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<RecipeSkeletonWithRightbar />}>{children}</Suspense>
    </div>
  )
}

export default RecipeLayout
