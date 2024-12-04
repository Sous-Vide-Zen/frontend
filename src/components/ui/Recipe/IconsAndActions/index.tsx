'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './iconsAndActions.module.scss'
import { RecipeFull } from '@/store/features/recipes/recipes.types'
import { Reactions, Popup } from '@/components/ui'

type RecipeCardProps = Partial<
  Pick<RecipeFull, 'views_count' | 'reactions_count' | 'slug'>
>

export const IconsAndActions: FC<RecipeCardProps> = ({
  slug,
  views_count,
  reactions_count,
}) => {
  const [active, setActive] = useState(false)

  const handleToggle = () => {
    setActive((prevValue) => !prevValue)
  }

  return (
    <div className={styles.actions}>
      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <button>
            <Image
              src="/img/recipe-card/viewsLight2.png"
              alt="views"
              width={24}
              height={24}
              draggable={false}
            />
            {views_count}
          </button>
          <Popup
            Content={() => (
              <button className={styles.like}>
                <Image
                  src="/img/recipe-card/heartSuit.png"
                  alt="like button"
                  width={24}
                  height={24}
                  draggable={false}
                />
                {reactions_count}
              </button>
            )}
            Tooltip={() => <Reactions slug={slug ?? ''} />}
          />
          <button>
            <Image
              src="/img/recipe-card/shareForward.png"
              alt="share button"
              width={24}
              height={24}
              draggable={false}
            />
            0{/*тут должно быть количество репостов*/}
          </button>
        </div>
      </div>
      <div className={styles.containerButton}>
        <div className={styles.dropdownIcon} onClick={() => handleToggle()}>
          &#8942;
        </div>
        {active && (
          <div className={styles.linkForRecipe}>
            <Link href={`/recipe/edit/${slug}`}>Редактировать рецепт</Link>
            <p>Удалить рецепт</p>
          </div>
        )}
      </div>
    </div>
  )
}
