import { FC, PropsWithChildren, Suspense } from 'react'
import styles from '../recipe.module.scss'
import { RecipeSkeleton } from '@/components/ui/Skeletons/skeletons'

const RecipeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<RecipeSkeleton />}>{children}</Suspense>
    </div>
  )
}

export default RecipeLayout
