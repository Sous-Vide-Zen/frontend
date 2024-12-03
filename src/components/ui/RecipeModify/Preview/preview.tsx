'use client'
import { FC, useState } from 'react'
import { IRecipeWithIngredients } from '@/store/features/recipes/recipes.types'
import styles from './preview.module.scss'
import Image from 'next/image'

interface RecipeCardProps {
  recipe: IRecipeWithIngredients
}

const Preview: FC<RecipeCardProps> = ({ recipe }) => {
  const changeIsFavoriteHandler = () => {
    console.log('function work')
    // todo - надо ли для нового рецепта далать добавление его в избранное?
  }

  const onPrinterClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    changeIsFavoriteHandler()
  }

  return (
    <div className={styles.preview}>
      <div className={styles.wrapper_icon}>
        <button
          onClick={(e) => {
            e.stopPropagation()
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
        <button className={styles.previewPrinter} onClick={onPrinterClick}>
          <Image
            src="/img/recipe-card/printer.png"
            alt="printer"
            width={40}
            height={40}
            draggable={false}
          />
        </button>
      </div>
      {recipe.preview_image ? (
        <Image
          src={recipe.preview_image}
          height={300}
          alt="recipe image"
          draggable={false}
          className={styles.notPreview}
        />
      ) : (
        <div className={styles.notPreview}></div>
      )}
    </div>
  )
}
export default Preview
