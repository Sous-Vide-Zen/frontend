'use client'

import { FC, ReactNode } from 'react'
import styles from './Modal.module.scss'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  showCloseButton?: boolean
  children: ReactNode
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  showCloseButton = true,
  children,
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>{children}</div>
        {showCloseButton && (
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L20 21M20 1L1 21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
