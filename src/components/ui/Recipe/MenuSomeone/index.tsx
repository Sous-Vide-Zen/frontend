'use client'

import { FC, useState } from 'react'
import Link from 'next/link'

import styles from './menuSomeone.module.scss'
import { RecipeFull } from '@/store/features/recipes/recipes.types'

type RecipeCardProps = Partial<
  Pick<RecipeFull, 'views_count' | 'reactions_count' | 'slug'>
>

export const MenuSomeone: FC<RecipeCardProps> = ({
  slug,
}) => {
  const [active, setActive] = useState(false)

  const handleToggle = () => {
    setActive((prevValue) => !prevValue)
  }

  return (
    <div className={styles.containerButton}>
      {active && (
        <div className={styles.linkForRecipe}>
          <Link href={`/recipe/edit/${slug}`}>Отписаться</Link>
          <p>Пожаловаться</p>
        </div>
      )}
      <div className={styles.dropdownIcon} onClick={() => handleToggle()}>
        &#8942;
      </div>
    </div>
  )
}
