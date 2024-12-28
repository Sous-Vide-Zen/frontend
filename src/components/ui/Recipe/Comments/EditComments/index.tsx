'use client'

import React, { FC, useEffect, useState } from 'react'

interface EditCommentProps {
  currentText: string //текущий текст комментария
  onSave: (newText: string) => void //функция, которая вызывается при сохранении нового текста.
}

const EditComment: FC<EditCommentProps> = ({ currentText, onSave }) => {
  const [newText, setNewText] = useState(currentText)

  useEffect(() => {
    setNewText(currentText)
  }, [currentText])

  const handleSave = () => {
    /*Функция handleSave вызывается при нажатии кнопки "Сохранить".
      Она передает текущее значение newText в функцию onSave, которая была передана в пропсах.
    onSave(newText)*/
  }

  return (
    <div>
      <input
        type="text"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
      />
      <button onClick={handleSave}>Сохранить</button>
    </div>
  )
}

export default EditComment
