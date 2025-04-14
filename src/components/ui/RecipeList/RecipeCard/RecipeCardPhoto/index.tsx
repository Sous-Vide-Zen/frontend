import { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import cn from 'clsx'
import { Modal } from '@/components/ui/Modal'
import { LinkLikeButton } from '@/components/ui/LinkLikeButton'

import styles from './RecipeCardPhoto.module.scss'
import { RecipeFull } from '@/store/features/recipes/recipes.types'

type RecipeCardProps = Pick<
  RecipeFull,
  'id' | 'preview_image' | 'cooking_time'
> & {
  isFavorite: boolean
  updateFavorite: boolean
  onFavoriteClick: () => void
  onButtonClick: () => void
  isAuthenticated: boolean // Пропс для проверки авторизации
  showLoginModal: () => void // Функция для открытия модального окна
}

export const RecipeCardPhoto: FC<RecipeCardProps> = ({
  id,
  preview_image,
  cooking_time,
  isFavorite,
  updateFavorite,
  onFavoriteClick: changeIsFavoriteHandler,
  onButtonClick,
  isAuthenticated, // Используем этот пропс для условной отрисовки кнопки
  showLoginModal, // Функция для открытия модального окна
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAuthenticated1, setIsAuthenticated1] = useState(true) // переключая стейт в true, добавляем
  // рецепт в избранное, false - открываем модалку.
  const formatNumber = (num: number): string => {
    return num > 0 ? num.toString() : ''
  }

  // Вычисляем часы и минуты приготовления
  const cookingTime = cooking_time || 0
  const hours = Math.floor(cookingTime / 60)
  const minutes = cookingTime % 60

  const formatCookingTime = () => {
    const hourLabel =
      hours === 1 || hours === 21
        ? 'час'
        : (hours >= 2 && hours <= 4) || (hours >= 22 && hours <= 24)
          ? 'часа'
          : 'часов'

    const minuteLabel =
      minutes === 1 || (minutes % 10 === 1 && minutes % 100 !== 11)
        ? 'минута'
        : (minutes >= 2 && minutes <= 4) ||
            (minutes % 10 >= 2 &&
              minutes % 10 <= 4 &&
              (minutes % 100 < 10 || minutes % 100 >= 20))
          ? 'минуты'
          : 'минут'

    const hourPart = formatNumber(hours)
    const minutePart = formatNumber(minutes)

    let result = ''

    if (hourPart) {
      result += `${hourPart} ${hourLabel}`
    }

    if (minutePart) {
      if (result) {
        result += ' '
      }
      result += `${minutePart} ${minuteLabel}`
    }

    return result || '0 минут'
  }

  return (
    <>
      <div className={styles.wrapper}>
        <button className={styles.previewPrinter}>
          <Image
            src="/img/recipe-card/printer.png"
            alt={`print ${id}`}
            width={28}
            height={28}
            draggable={false}
          />
        </button>
        {preview_image ? (
          <Image
            src={preview_image}
            height={300}
            alt="recipe image"
            draggable={false}
            className={styles.notPreview}
          />
        ) : (
          <div className={styles.notPreview}>Фото отсутствует</div>
        )}
        {!isAuthenticated1 ? (
          <button
            className={styles.previewSave}
            onClick={() => setIsModalOpen(true)} // Открываем модальное окно
            disabled={updateFavorite}
          >
            <p>modal</p>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <p>
                Войдите или зарегистрируйтесь, чтобы создавать собственные
                рецепты и оценивать рецепты других пользователей.
              </p>
              <div className={styles.modal_btns}>
                <div className={styles.modal_login}>
                  <LinkLikeButton color="primary" size="big" href="/login">
                    Вход
                  </LinkLikeButton>
                </div>
                <div className={styles.modal_registration}>
                  <LinkLikeButton
                    color="secondary"
                    size="big"
                    href="/registration"
                  >
                    Регистрация
                  </LinkLikeButton>
                </div>
              </div>
              <div />
            </Modal>
          </button>
        ) : (
          <button
            className={styles.previewSave}
            onClick={changeIsFavoriteHandler}
            disabled={updateFavorite}
          >
            {updateFavorite ? (
              <Image
                src="/img/loader.svg"
                alt="loader"
                width={26}
                height={26}
                draggable={false}
                priority
              />
            ) : (
              <Image
                src={`/img/recipe-card/${isFavorite ? 'save-filled.svg' : 'save.svg'}`}
                alt={`save ${id}`}
                width={26}
                height={26}
                draggable={false}
              />
            )}
          </button>
        )}
        <button
          className={cn(styles.previewTime, {
            [styles.tooltip]: true,
            [styles.withBorder]: !preview_image,
          })}
          onClick={onButtonClick}
        >
          {formatCookingTime()}
          <span
            className={cn(styles.tooltiptext, {
              [styles.tooltipTop]: true,
            })}
          >
            Нажмите для предварительного просмотра
          </span>
        </button>
      </div>
    </>
  )
}
