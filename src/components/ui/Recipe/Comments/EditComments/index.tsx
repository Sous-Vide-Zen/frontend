'use client'

import { FC, useEffect, useState } from 'react'
import styles from '@/components/ui/Recipe/Comments/EditComments/EditComment.module.scss'

interface EditCommentProps {
  initialText: string
  onSave: (newText: string) => void
}

const EditComment: FC<EditCommentProps> = ({ initialText, onSave }) => {
  const [commentText, setCommentText] = useState(initialText)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    onSave(commentText)
    setIsEditing(false)
  }

  useEffect(() => {
    setCommentText(initialText)
  }, [initialText])

  return (
    <div className={styles.editCommentContainer}>
      {!isEditing ? (
        // Если не редактируем, показываем простой параграф с переносами строк
        <p
          onClick={(event) => {
            event.preventDefault() // Предотвращаем стандартное поведение браузера
            setIsEditing(true)
          }}
          className={styles.commentText}
        >
          {commentText}
        </p>
      ) : (
        // Если редактируем, показываем параграф с текстом
        <div className={styles.editText}>
          <p
            contentEditable
            suppressContentEditableWarning
            className={styles.commentTextEditable}
            // tabIndex={-1} // Добавлено
          >
            {commentText}
          </p>
        </div>
      )}
    </div>
  )
}

export default EditComment
