'use client'

import Image from 'next/image'
import styles from './comments.module.scss'
import { useState } from 'react'
import { PopupEditingMenu } from '@/components/ui/Recipe/Comments/PopupEditingMenu/index'
import EditComment from '@/components/ui/Recipe/Comments/EditComments/index'

export default function Comments() {
  const reactions = [
    { src: '/img/reactions/heart.svg', alt: 'heart', count: 120 },
    { src: '/img/reactions/thumb-up.svg', alt: 'thumb-up', count: 13 },
    { src: '/img/reactions/thumb-down.svg', alt: 'thumb-down', count: 3 },
    { src: '/img/reactions/angry-face.svg', alt: 'angry-face', count: 0 },
    { src: '/img/reactions/fire.svg', alt: 'fire', count: 24 },
  ]

  const [commentText, setCommentText] = useState('')
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
  ])

  // const handleEditComment = (id: number) => {
  //   setEditingCommentId(id)
  // }

  // const handleSaveComment = (id: number, newText: string) => {
  //   setComments((prevComments) =>
  //     prevComments.map((comment) =>
  //       comment.id === id ? { ...comment, text: newText } : comment,
  //     ),
  //   )
  //   setEditingCommentId(null)
  // }

  // const handleCancelEdit = () => {
  //   setEditingCommentId(null)
  // }

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
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
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
                    </div>
                    <p className={styles.commentsBottomTextDescr}>
                      {comment.text}
                    </p>
                    <PopupEditingMenu />
                    {/* onEdit={() => handleEditComment(comment.id)} */}

                    {/* {editingCommentId === comment.id ? (
                    <EditComment
                      currentText={comment.text}
                      onSave={(newText) =>
                        handleSaveComment(comment.id, newText)
                      }
                    />
                  ) : (
                    <p className={styles.commentsBottomTextDescr}>
                      {comment.text}
                    </p>
                  )} */}
                    {/* {
                      <EditComment
                        commentEdit={comment.text}
                        onSave={() => handleEditClick(comment.id)}
                      />
                    } */}
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
