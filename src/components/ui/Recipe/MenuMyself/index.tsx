'use client'

import { FC, useState } from 'react'
import Link from 'next/link'

import styles from './menuMyself.module.scss'
import { RecipeFull } from '@/store/features/recipes/recipes.types'

type RecipeCardProps = Partial<Pick<RecipeFull, 'slug'>> & {
  allowEdit: boolean
  isMyRecipe: boolean
}

/* 
 для меню лучше использовать компонент Tooltip, а пункты меню передавать пропсами
*/

export const MenyMyself: FC<RecipeCardProps> = ({
  slug,
  allowEdit,
  isMyRecipe,
}) => {
  const [active, setActive] = useState(false)

  const handleToggle = () => {
    setActive((prevValue) => !prevValue)
  }

  return (
    <div className={styles.containerButton}>
      {active && (
        <div className={styles.linkForRecipe}>
          {allowEdit && (
            <Link href={`/recipe/edit/${slug}`}>Редактировать рецепт</Link>
          )}
          {isMyRecipe && (
            <Link href={`/recipe/delete/${slug}`}>Удалить рецепт</Link>
          )}
        </div>
      )}
      <div className={styles.dropdownIcon} onClick={() => handleToggle()}>
        &#8942;
      </div>
    </div>
  )
}
