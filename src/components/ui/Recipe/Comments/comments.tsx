'use client'

import Image from 'next/image'
import styles from './comments.module.scss'
import { useState } from 'react'
import EditComment from './EditComments' // Импортируем новый компонент
import { PopupEditingMenu } from '@/components/ui/Recipe/Comments/PopupEditingMenu'

export default function Comments() {
  const reactions = [
    { src: '/img/reactions/heart.svg', alt: 'heart', count: 120 },
    { src: '/img/reactions/thumb-up.svg', alt: 'thumb-up', count: 13 },
    { src: '/img/reactions/thumb-down.svg', alt: 'thumb-down', count: 3 },
    { src: '/img/reactions/angry-face.svg', alt: 'angry-face', count: 0 },
    { src: '/img/reactions/fire.svg', alt: 'fire', count: 24 },
  ]

  const [commentTexts, setCommentTexts] = useState<
    Record<string | number, string>
  >({})

  const [comments, setComments] = useState([
    {
      id: 1,
      avatar: '/img/comments/png_1.png',
      username: 'Алина Устимова (Вы)',
      text: 'Безумно вкусно получается! Спасибо за рецепт))',
    },
    {
      id: 2,
      avatar: '/img/comments/png_2.png',
      username: 'Сергей Петров',
      text: 'Супер рецепт! Я еще добавляю кунжутное масло и 10/10',
    },
    {
      id: 3,
      avatar: '/img/comments/png_3.png',
      username: 'lena_cook',
      text: 'Легкий, но такой вкусный ужин. Рекомендую)',
    },
    {
      id: 4,
      avatar: '/img/comments/png_3.png',
      username: 'lena_cook',
      text: 'Легкий, но такой вкусный ужин. Рекомендую)',
    },
    {
      id: 5,
      avatar: '/img/comments/png_3.png',
      username: 'lena_cook',
      text: 'Легкий, но такой вкусный ужин. Рекомендую)',
    },
  ])

  /* Обработчики событий */

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)

  const handleEditComment = (id: number) => {
    setEditingCommentId(id) // Устанавливает id комментария, который нужно редактировать
  }

  const handleSaveComment = (id: number, newText: string) => {
    setCommentTexts((prevCommentTexts) => ({
      ...prevCommentTexts,
      [id]: newText,
    }))
    setEditingCommentId(null)
  }

  const handleCancelEdit = () => {
    setEditingCommentId(null)
  }

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter((comment) => comment.id !== id))
  }

  return (
    <div className={styles.commentsContainer}>
      <h2 className={styles.commentsTitle}>Комментарии</h2>
      <div className={styles.commentsWrapper}>
        <div className={styles.commentsTopContainer}>
          <div className={styles.commentsContent}>
            <input
              className={styles.commentsInput}
              type="text"
              placeholder="Введите текст комментария..."
              value={commentTexts['new'] || ''} // Для нового комментария используем ключ 'new'
              onChange={(e) =>
                setCommentTexts({ ...commentTexts, ['new']: e.target.value })
              }
            />
            <div className={styles.buttonDiv}>
              <button className={styles.commentsBtn}>Отправить</button>
            </div>
          </div>
        </div>

        <ul className={styles.commentsList}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.commentsItem}>
              <div className={styles.commentsBottomContainer}>
                <div className={styles.commentsTopBox}>
                  <div className={styles.commentsTextContent}>
                    <div className={styles.commentsImgText}>
                      <Image
                        src={comment.avatar}
                        alt={comment.username}
                        className={styles.avatar}
                        width={20}
                        height={20}
                      />
                      <p className={styles.commentsNameText}>
                        {comment.username}
                      </p>

                      <PopupEditingMenu
                        onEdit={() => handleEditComment(comment.id)}
                        onDelete={() => handleDeleteComment(comment.id)}
                      />
                    </div>
                    {editingCommentId === comment.id ? (
                      <EditComment
                        initialText={comment.text}
                        onSave={(newText) =>
                          handleSaveComment(comment.id, newText)
                        }
                        onCancel={handleCancelEdit}
                      />
                    ) : (
                      <p className={styles.commentsBottomTextDescr}>
                        {commentTexts[comment.id] || comment.text}{' '}
                      </p>
                    )}
                  </div>
                </div>
                <div className={styles.commentsBottomBox}>
                  <div className={styles.commentsReactionsContent}>
                    <button className={styles.commentsBtn}>Ответить</button>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flexGrow: 1,
                      }}
                    >
                      {reactions.map((reaction, index) => (
                        <div key={index} className={styles.reactionItem}>
                          <div className={styles.commentsReactions}>
                            <Image
                              src={reaction.src}
                              alt={reaction.alt}
                              width={24}
                              height={24}
                            />
                            <p className={styles.commentsReactionsIconsText}>
                              {reaction.count}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
