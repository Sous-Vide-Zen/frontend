'use client'

import Image from 'next/image'
import styles from './DeleteComment.module.scss'

interface DeleteCommentProps {
  onConfirm: () => void
  onCancel: () => void
}



const DeleteComment: React.FC<DeleteCommentProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onCancel}>
          ×
        </button>
        <Image
          src={'/img/comments/clarity_success-standard-solid.svg'}
          alt="success"
          width={60}
          height={60}
        />
        <p className={styles.deleteCommentModalText}>Комментарий удален!</p>
        {/* <button onClick={onConfirm}>Да</button>
        <button onClick={onCancel}>Нет</button> */}
      </div>
    </div>
  )
}

export default DeleteComment
