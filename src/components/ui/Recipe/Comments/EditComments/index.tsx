'use client'

import { FC, useEffect, useState } from 'react'
import styles from '@/components/ui/Recipe/Comments/EditComments/EditComments.module.scss'

interface EditCommentProps {
  initialText: string
  onSave: (newText: string) => void
  onCancel: (newText: string) => void
}

const EditComment: FC<EditCommentProps> = ({ initialText, onSave }) => {
  const [commentText, setCommentText] = useState(initialText)

  const handleSave = () => {
    onSave(commentText)
  }

  useEffect(() => {
    setCommentText(initialText)
  }, [initialText])

  return (
    <div className={styles.editCommentContainer}>
      <input
        className={styles.editCommentsInputTextDescr}
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
    </div>
  )
}

export default EditComment
