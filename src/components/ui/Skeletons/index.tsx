import { FC } from 'react'
import styles from './skeletons.module.scss'

type AnySkeletonProps = {
  width?: number
  height?: number
}

export const Skeleton: FC<AnySkeletonProps> = ({ width, height }) => (
  <div
    className={`${styles.skeletonBox} ${styles.anyBox}`}
    style={{ width, height }}
  />
)

export const NavLinkSkeleton = () => (
  <div className={`${styles.skeletonBox} ${styles.navLink}`} />
)

export const RecipeSkeleton = () => (
  <div className={`${styles.skeletonBox} ${styles.recipeCard}`} />
)

export const RecipeSkeletonWithRightbar = () => (
  <div className={styles.recipe}>
    <div className={styles.skeletonBox} />
    <div className={styles.skeletonBox} />
  </div>
)
