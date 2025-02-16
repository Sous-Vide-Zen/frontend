'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './ShowComment.module.scss'
import EditComment from '@/components/ui/Recipe/Comments/EditComments/index'
import { PopupEditingMenu } from '@/components/ui/Recipe/Comments/PopupEditingMenu'
import { CommentData } from '@/store/features/comments/comments.types'

const InitialComment: CommentData[] = [
  {
    id: 1,
    author: {
      id: 1,
      username: 'Алина Устимова',
      display_name: 'Alina Ustimova',
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
      display_name: 'Sergei Petrov',
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
      display_name: 'Lena Cook',
      avatar: '/img/comments/png_3.png',
    },
    text: 'Легкий, но такой вкусный ужин. Рекомендую)',
    pub_date: '2023-03-15T12:10:00Z',
    updated_date: '2023-03-15T12:10:00Z',
  },
]

interface ShowCommentProps {
  comments: CommentData[]
  reactions: {
    src: string
    alt: string
    count: number
  }[]
  onDelete: (id: number) => void
  userRole: string
  userId: number
}

const ShowComment: React.FC<ShowCommentProps> = ({
  comments,
  reactions,
  onDelete,
  userRole,
  userId,
}) => {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [commentTexts, setCommentTexts] = useState<{ [key: number]: string }>(
    {},
  )

  const canEditOrDeleteComment = (comment: CommentData) => {
    const isAuthor = userId === comment.author.id
    const isAdmin = userRole === 'admin'
    const isModerator = userRole === 'moderator'
    const isWithin24Hours =
      new Date().getTime() - new Date(comment.pub_date).getTime() <
      24 * 60 * 60 * 1000

    return (isAuthor || isAdmin || isModerator) && isWithin24Hours
  }

  // const canEditOrDeleteComment = (comment: CommentData) => {
  //   const isWithin24Hours =
  //     new Date().getTime() - new Date(comment.pub_date).getTime() <
  //     24 * 60 * 60 * 1000
  //   return (userId === comment.author.id ||
  //     userRole === 'admin' ||
  //     userRole === 'moderator') &&
  //     isWithin24Hours
  //     ? true
  //     : false
  // }

  return (
    <ul className={styles.commentsList}>
      {InitialComment.map((comment: CommentData) => (
        <li key={comment.id} className={styles.commentsItem}>
          <div className={styles.commentsBottomContainer}>
            <div className={styles.commentsTopBox}>
              <div className={styles.commentsTextContent}>
                <div className={styles.commentsImgText}>
                  <Image
                    src={comment.author.avatar || '/img/default-avatar.png'}
                    alt={comment.author.username}
                    className={styles.avatar}
                    width={20}
                    height={20}
                  />
                  <p className={styles.commentsNameText}>
                    {comment.author.username}
                  </p>
                </div>
                {editingCommentId === comment.id ? (
                  <EditComment
                    initialText={commentTexts[comment.id] || comment.text}
                    onSave={(newText) => {
                      setCommentTexts((prev) => ({
                        ...prev,
                        [comment.id]: newText,
                      }))
                      setEditingCommentId(null)
                    }}
                    onCancel={() => setEditingCommentId(null)}
                  />
                ) : (
                  <p className={styles.commentsBottomTextDescr}>
                    {comment.text}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.commentsBottomBox}>
              <button className={styles.commentsBtn}>Ответить</button>
              <div className={styles.commentsReactionsContent}>
                {reactions.map((reaction, index) => (
                  <div key={index} className={styles.reactionItem}>
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
                ))}
              </div>
            </div>
            
            {canEditOrDeleteComment(comment) && (
              <PopupEditingMenu
                onEdit={() => {
                  setEditingCommentId(comment.id)
                  setCommentTexts((prev) => ({
                    ...prev,
                    [comment.id]: comment.text,
                  }))
                }}
                onDelete={() => onDelete(comment.id)}
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ShowComment
