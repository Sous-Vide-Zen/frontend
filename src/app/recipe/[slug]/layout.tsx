import { FC, PropsWithChildren, Suspense } from 'react'
import styles from './recipe.module.scss'
import Layout from '@/components/layout/layout'
import { RecipeSkeleton } from '@/components/ui/Skeletons/skeletons'

const RecipeLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Layout isSearch={true}>
      <div className={styles.container}>
        <Suspense fallback={<RecipeSkeleton />}>{children}</Suspense>
      </div>
    </Layout>
  )
}

export default RecipeLayout
