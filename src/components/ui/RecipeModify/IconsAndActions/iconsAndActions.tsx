'use client'
import { FC, useState } from 'react'
import { RecipeFull } from '@/store/features/recipes/recipes.types'
import styles from './iconsAndActions.module.scss'
import Image from 'next/image'
import Reactions from '@/components/ui/Reactions'
import Popup from '@/components/ui/Popup/Popup'
import Link from 'next/link'

interface RecipeCardProps {
  recipe: RecipeFull
}

const IconsAndActions: FC<RecipeCardProps> = ({ recipe }) => {
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
              src="/img/recipe-card/views.svg"
              alt="views"
              width={24}
              height={24}
              draggable={false}
            />
            {recipe.views_count}
          </button>
          <Popup
            Content={() => (
              <button className={styles.like}>
                <Image
                  src="/img/recipe-card/like.svg"
                  alt="like button"
                  width={24}
                  height={24}
                  draggable={false}
                />
                {recipe.reactions_count}
              </button>
            )}
            Tooltip={() => <Reactions slug={recipe.slug} />}
          />
          <button>
            <Image
              src="/img/recipe-card/share.svg"
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
            <Link href={`/recipe/edit/${recipe.slug}`}>
              Редактировать рецепт
            </Link>
            <p>Удалить рецепт</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default IconsAndActions
