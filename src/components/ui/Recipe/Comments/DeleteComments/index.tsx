'use client'

import { FC } from 'react'
import styles from './DeleteComments.module.scss'

interface DeleteComments {
  onConfirm: () => void
  onCancel: () => void
}

const DeleteComment: FC<DeleteComments> = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.confirmationDeletContainer}>
      {/* <p>Вы уверены, что хотите удалить этот комментарий?</p> */}
      <div className={styles.buttonDeleteContainer}>
        <button className={styles.confirmButtonDelete} onClick={onConfirm}>
          Да
        </button>
        <button className={styles.cancelButtonDelete} onClick={onCancel}>
          Нет
        </button>
      </div>
    </div>
  )
}

export default DeleteComment
