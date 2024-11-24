'use client'

import { FC, ReactNode } from 'react'
import styles from './Modal.module.scss'
import LinkLikeButton from '@/components/ui/LinkLikeButton/LinkLikeButton'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.content}>
            Войдите или зарегистрируйтесь, чтобы создавать собственные рецепты и
            оценивать рецепты других пользователей.
          </div>
          {/* {children} */}
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
          <div className={styles.modal_btns}>
            <div className={styles.modal_login}>
              <LinkLikeButton color="primary" size="medium" href="login">
                Вход
              </LinkLikeButton>
            </div>
            <LinkLikeButton color="secondary" size="medium" href="registration">
              Регистрация
            </LinkLikeButton>
          </div>
        </div>
      </div>
    </>
  )
}
