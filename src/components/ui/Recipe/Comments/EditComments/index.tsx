'use client'

import { FC, useEffect, useRef, useState } from 'react'
import styles from '@/components/ui/Recipe/Comments/EditComments/EditComments.module.scss'

interface EditCommentProps {
  initialText: string
  onSave: (newText: string) => void
}

const EditComment: FC<EditCommentProps> = ({ initialText, onSave }) => {
  const [commentText, setCommentText] = useState(initialText)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSave = () => {
    onSave(commentText)
  }

  useEffect(() => {
    setCommentText(initialText) // Обновляем текст при изменении initialText
  }, [initialText])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
      inputRef.current.setSelectionRange(commentText.length, commentText.length) // Устанавливаем курсор в конец
    }
  }, [commentText, initialText])
  return (
    <div className={styles.editCommentContainer}>
      <input
        ref={inputRef}
        className={styles.editCommentsInputTextDescr}
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
    </div>
  )
}

export default EditComment
