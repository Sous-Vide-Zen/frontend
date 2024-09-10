import { FC, PropsWithChildren, Suspense } from 'react'

import styles from './mutationRecipe.module.scss'
import Layout from '@/components/layout/layout'
import { RecipeSkeleton } from '@/components/ui/Skeletons/skeletons'

const RecipeMutationsLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Layout isSearch={true} sidebar={false}>
      <div className={styles.container}>
        <Suspense fallback={<RecipeSkeleton />}>{children}</Suspense>
      </div>
    </Layout>
  )
}

export default RecipeMutationsLayout
