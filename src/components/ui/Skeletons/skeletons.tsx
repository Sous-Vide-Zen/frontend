'use client'
import styles from './skeletons.module.scss'

export const NavLinkSkeleton = () => <div className={`${styles.skeletonBox} ${styles.navLink}`} />

export const RecipeSkeleton = () => <div className={`${styles.skeletonBox} ${styles.recipe}`} />
