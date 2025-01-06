'use client'

import { FC, useState } from 'react'
import Link from 'next/link'
import styles from './PopupEditingMenu.module.scss'
import { RecipeFull } from '@/store/features/recipes/recipes.types'

type RecipeCardProps = Partial<Pick<RecipeFull, 'slug'>>

export const PopupEditingMenu: FC<RecipeCardProps> = ({ slug }) => {
  const [active, setActive] = useState(false)

  const handleToggle = () => {
    setActive((prevValue) => !prevValue)
  }

  return (
    <div className={styles.containerButton}>
      {active && (
        <div className={styles.linkEditingMenu}>
          <Link href={`/recipe/edit/${slug}`}>Редактировать</Link>
          <Link href={``}>Удалить</Link>
        </div>
      )}
      <div className={styles.dropdownIcon} onClick={() => handleToggle()}>
        &#8942;
      </div>
    </div>
  )
}
