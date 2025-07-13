'use client'
import { FC, useState, useEffect, KeyboardEvent } from 'react'
import { RecipeFormInputs } from '@/store/features/recipes/recipes.types'
import styles from './tagsRecipe.module.scss'
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
  Control,
} from 'react-hook-form'

interface Props {
  readOnly: boolean
  getValues: UseFormGetValues<RecipeFormInputs>
  register: UseFormRegister<RecipeFormInputs>
  setValue: UseFormSetValue<RecipeFormInputs>
}

export const TagsRecipe: FC<Props> = ({
  readOnly,
  getValues,
  register,
  setValue,
}) => {
  const [inputValue, setInputValue] = useState('')
  const initialTags =
    getValues('tag')?.map((tag) =>
      typeof tag === 'string' ? tag : tag.label,
    ) || []
  const [tags, setTags] = useState<string[]>(initialTags)
  const [errorsMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const formattedTags = tags.map((tag) => ({ label: tag }))
    setValue('tag', formattedTags)
  }, [tags, setValue])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const addTag = () => {
    if (!inputValue.trim()) return

    // Проверка максимального количества тегов
    if (tags.length >= 50) {
      setErrorMessage('Максимальное количество тегов - 50')
      return
    }

    const tagText = inputValue.trim()

    // Проверка максимальной длины тега
    if (tagText.length > 10) {
      setErrorMessage('Максимальная длина тега - 100 символов')
      return
      // tagText = tagText.substring(0, 100)
    }

    // Добавляем # если его нет
    // if (!tagText.startsWith('#')) {
    //   tagText = `#${tagText}`
    // }

    // Проверяем на уникальность
    if (!tags.includes(tagText)) {
      setTags([...tags, tagText])
    } else {
      setErrorMessage('Tакой тег уже существует')
      return
    }

    setErrorMessage('')
    setInputValue('')
  }

  const removeTag = (index: number) => {
    if (readOnly) return
    setTags(tags.filter((_, i) => i !== index))
  }

  return (
    <div className={styles.tagsContainer}>
      {!readOnly && (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Введите тег и нажмите Enter"
          className={styles.tagInput}
          disabled={readOnly}
        />
      )}
      {errorsMessage && (
        <span className={styles.errorMessage}>{errorsMessage}</span>
      )}

      <div className={styles.tagsList}>
        {tags.map((tag, index) => (
          <div key={index} className={styles.tagItem}>
            <span>{tag}</span>
            {!readOnly && (
              <button
                type="button"
                onClick={() => removeTag(index)}
                className={styles.removeTag}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Скрытый инпут для react-hook-form */}
      <input type="hidden" {...register('tag')} />
    </div>
  )
}
