'use client'

import React from 'react'
import styles from './AddNewComment.module.scss'

type NewCommentProps = {
  onCommentChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  commentText: string
}

const AddNewComment: React.FC<NewCommentProps> = ({
  onCommentChange,
  commentText,
}) => {
  return (
    <div className={styles.commentsTopContainer}>
      <div className={styles.commentsContent}>
        <input
          className={styles.commentsInput}
          type="text"
          placeholder="Введите текст комментария..."
          value={commentText}
          onChange={onCommentChange}
        />
        <div className={styles.buttonDiv}>
          <button className={styles.commentsBtn}>Отправить</button>
        </div>
      </div>
    </div>
  )
}

export default AddNewComment
