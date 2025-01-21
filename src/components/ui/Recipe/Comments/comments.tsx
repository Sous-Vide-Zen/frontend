'use client'

import Image from 'next/image'
import styles from './comments.module.scss'
import { useState } from 'react'
import EditComment from './EditComments'
import DeleteComment from '@/components/ui/Recipe/Comments/DeleteComments/index'
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
      author: {
        id: 1,
        username: 'Алина Устимова',
        avatar: '/img/comments/png_1.png',
      },
      text: 'Безумно вкусно получается! Спасибо за рецепт))',
      pub_date: '2023-03-15T12:10:00Z',
      updated_date: '2023-03-15T12:10:00Z',
    },

    {
      id: 2,
      author: {
        id: 2,
        username: 'Сергей Петров',
        avatar: '/img/comments/png_2.png',
      },
      text: 'Супер рецепт! Я еще добавляю кунжутное масло и 10/10',
      pub_date: '2023-03-15T12:10:00Z',
      updated_date: '2023-03-15T12:10:00Z',
    },

    {
      id: 3,
      author: {
        id: 3,
        username: 'lena_cook',
        avatar: '/img/comments/png_3.png',
      },
      text: 'Легкий, но такой вкусный ужин. Рекомендую)',
      pub_date: '2023-03-15T12:10:00Z',
      updated_date: '2023-03-15T12:10:00Z',
    },
  ])

  /* обработчики клика */

  const handleSaveComment = (id: number, newText: string) => {
    setCommentTexts((prevCommentTexts) => ({
      ...prevCommentTexts,
      [id]: newText,
    }))
    setEditingCommentId(null)
  }

  const handleEditComment = (id: number) => {
    setEditingCommentId(id) // Устанавливает id комментария, который нужно редактировать
  }

  const handleCancelEdit = () => {
    setEditingCommentId(null)
  }

  /* логика действий над комментариями */

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null)

  const currentUser = {
    id: 1,
    role: 'user', // 'user', 'admin', 'moderator'
  }

  const handleDeleteComment = (id: number) => {
    setCommentToDelete(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDeleteComment = () => {
    if (commentToDelete !== null) {
      setComments(
        comments.filter((comments) => comments.id !== commentToDelete),
      )
      setCommentToDelete(null)
      setIsDeleteModalOpen(false)
    }
  }

  const canEditComment = (comment) => {
    const isAuthor = currentUser.id === comment.author.id
    const isAdmin = currentUser.role === 'admin'
    const isWithin24Hours =
      new Date().getTime() - new Date(comment.pub_date).getTime() <
      24 * 60 * 60 * 1000

    return isAuthor || (isAdmin && isWithin24Hours)
  }

  const canDeleteComment = (comments) => {
    const isAuthor = currentUser.id === comments.author.id
    const isAdmin = currentUser.role === 'admin'
    const isModerator = currentUser.role === 'moderator'
    const isAfter24Hours =
      new Date().getTime() - new Date(comments.pub_date).getTime() >
      24 * 60 * 60 * 1000

    return (isAuthor || isAdmin || isModerator) && isAfter24Hours
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
              value={commentTexts['new'] || ''}
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
                        src={comment.author.avatar}
                        alt={comment.author.username}
                        className={styles.avatar}
                        width={20}
                        height={20}
                      />
                      <p className={styles.commentsNameText}>
                        {comment.author.username}
                      </p>

                      <PopupEditingMenu
                        onEdit={() =>
                          canEditComment(comment) &&
                          handleEditComment(comment.id)
                        }
                        onDelete={() =>
                          canDeleteComment(comment) &&
                          handleDeleteComment(comment.id)
                        }
                      />
                    </div>
                    {editingCommentId === comment.id ? (
                      <EditComment
                        initialText={comment.text}
                        onSave={(newText) =>
                          handleSaveComment(comment.id, newText)
                        }
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
        <DeleteComment
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDeleteComment}
        />
      </div>
    </div>
  )
}
