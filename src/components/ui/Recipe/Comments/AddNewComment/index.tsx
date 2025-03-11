'use client'

import React from 'react'
import styles from './AddNewComment.module.scss'

type OnCommentChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement>,
) => void

type NewCommentProps = {
  onCommentChange: OnCommentChangeHandler
  commentText: string
}

//устанавливаем максимальное количество вводимых символов
const MAX_COMMENT_LENGTH = 1000

const AddNewComment: React.FC<NewCommentProps> = ({
  onCommentChange,
  commentText,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    /*
    onCommentChange,
    ксли длина вводимых символов не превышает 1000, вызывется функция onCommentChange,
    иначе ввод текста блокируется.
    */

    if (event.target.value.length <= MAX_COMMENT_LENGTH) {
      onCommentChange(event)
    }
  }
  // console.log(commentText)

  return (
    <div className={styles.commentsTopContainer}>
      <div className={styles.commentsContent}>
        <input
          className={styles.commentsInput}
          type="text"
          placeholder="Введите текст комментария..."
          value={commentText}
          onChange={handleChange}
        />
        <div className={styles.buttonDiv}>
          <button className={styles.commentsBtn}>Отправить</button>
        </div>
      </div>
    </div>
  )
}

export default AddNewComment
