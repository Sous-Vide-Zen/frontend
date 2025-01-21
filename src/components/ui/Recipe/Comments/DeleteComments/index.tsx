'use client'

import { FC } from 'react'
import Image from 'next/image'
import styles from './DeleteComment.module.scss'

type DeleteCommentModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const DeleteComment: FC<DeleteCommentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <Image
          src={'/img/comments/clarity_success-standard-solid.svg'}
          alt="success"
          width={60}
          height={60}
        />
        <p className={styles.deleteCommentModalText}>Ваш комментарий удален</p>
      </div>
    </div>
  )
}

export default DeleteComment
