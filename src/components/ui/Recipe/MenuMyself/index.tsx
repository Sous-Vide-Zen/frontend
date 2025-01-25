'use client'

import { FC, useState } from 'react'
import Link from 'next/link'

import styles from './menuMyself.module.scss'
import { RecipeFull } from '@/store/features/recipes/recipes.types'

type RecipeCardProps = Partial<Pick<RecipeFull, 'slug'>> & {
  isNotOlder24Hours: boolean
}

/* 
 для меню лучше использовать компонент Tooltip, а пункты меню передавать пропсами
*/

export const MenyMyself: FC<RecipeCardProps> = ({
  slug,
  isNotOlder24Hours,
}) => {
  const [active, setActive] = useState(false)

  const handleToggle = () => {
    setActive((prevValue) => !prevValue)
  }

  return (
    <div className={styles.containerButton}>
      {active && (
        <div className={styles.linkForRecipe}>
          {isNotOlder24Hours && (
            <Link href={`/recipe/edit/${slug}`}>Редактировать рецепт</Link>
          )}
          <Link href={`/recipe/delete/${slug}`}>Удалить рецепт</Link>
        </div>
      )}
      <div className={styles.dropdownIcon} onClick={() => handleToggle()}>
        &#8942;
      </div>
    </div>
  )
}
