'use client'

import { FC } from 'react'
import Image from 'next/image'

import styles from './recipePhoto.module.scss'
import { NewRecipePhoto } from './NewRecipePhoto'

interface RecipeCardProps {
  isNew: boolean
  url?: string
  setUrl?: (newUrl: string) => void
  linkButton?: boolean
  onLinkClick?: () => void
  printButton?: boolean
  onPrintClick?: () => void
  favoriteButton?: boolean
  onFavoriteClick?: () => void
}

export const RecipePhoto: FC<RecipeCardProps> = ({
  isNew,
  url,
  setUrl,
  linkButton,
  onLinkClick,
  printButton,
  onPrintClick,
}) => {
  const changeIsFavoriteHandler = () => {
    console.log('function work')
    // todo - надо ли для нового рецепта далать добавление его в избранное?
  }

  if (isNew && !url) return <NewRecipePhoto url={url} setUrl={setUrl} />

  return (
    <div className={styles.preview}>
      <div className={styles.iconsWrapper}>
        {linkButton && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onLinkClick && onLinkClick()
            }}
            className={styles.previewLink}
          >
            <Image
              src="/img/recipe-card/link.png"
              alt="save"
              width={40}
              height={40}
              draggable={false}
            />
          </button>
        )}
        {printButton && (
          <button className={styles.previewPrinter} onClick={(e)=>{
            e.stopPropagation()
            onPrintClick && onPrintClick()
          }}>
            <Image
              src="/img/recipe-card/printer.png"
              alt="printer"
              width={40}
              height={40}
              draggable={false}
            />
          </button>
        )}
      </div>
      {url ? (
        <Image
          src={url}
          height={300}
          width={803}
          alt="recipe image"
          draggable={false}
          className={styles.notPreview}
        />
      ) : (
        <div className={styles.notPreview}>Фото отсутствует</div>
      )}
    </div>
  )
}
