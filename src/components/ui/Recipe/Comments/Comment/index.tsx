'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './Comment.module.scss'
import EditComment from '@/components/ui/Recipe/Comments/EditComments/index'
import { PopupEditingMenu } from '@/components/ui/Recipe/Comments/PopupEditingMenu'
import { CommentData } from '@/store/features/comments/comments.types'
import { useAuth } from '@/hooks/useAuth'

interface CommentProps {
  data: CommentData
  reactions: {
    src: string
    alt: string
    count: number
  }[]
  onDelete: (id: number) => void
}

const Comment: React.FC<CommentProps> = ({ data, reactions, onDelete }) => {
  const userData = useAuth()

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [commentTexts, setCommentTexts] = useState<{ [key: number]: string }>(
    {},
  )

  const isAuthor = userData.id === data.author.id
  const isAdmin = userData.is_admin
  const isModerator = userData.is_staff
  const commentDate = new Date(data.pub_date)
  const isWithin24Hours =
    new Date().getTime() - commentDate.getTime() < 24 * 60 * 60 * 1000

  console.log(
    'isAuthor:',
    isAuthor,
    'isAdmin:',
    isAdmin,
    'isModerator:',
    isModerator,
  )

  let canEdit = false
  let canDelete = false

  // Если прошло не более 24 часов:
  if (isWithin24Hours) {
    // Модератор может удалять чужие комментарии, а свои комментарии может и редактировать и удалять;
    if (isModerator) {
      canDelete = true
      canEdit = isAuthor
    }

    // Автор комментария может редактировать комментарии
    if (isAuthor) {
      canEdit = true
    }

    // Администратор может редактировать и удалять свой/чужой комментарий
    if (isAdmin) {
      canDelete = true
      canEdit = true
    }
  } else {
    // Если прошло более 24 часов:

    // Удалять могут:  автор комментария, администратор и модератор
    if (!isWithin24Hours) {
      canDelete = isAuthor || isAdmin || isModerator
    }
  }

  return (
    <div className={styles.commentsBottomContainer}>
      <div className={styles.commentsTopBox}>
        <div className={styles.commentsTextContent}>
          <div className={styles.commentsImgText}>
            <Image
              src={data?.author?.avatar ?? '/img/author.svg'}
              alt={data?.author?.username}
              className={styles.avatar}
              width={20}
              height={20}
            />
            <p className={styles.commentsNameText}>{data?.author?.username}</p>
          </div>
          {editingCommentId === data?.id ? (
            <EditComment
              initialText={commentTexts[data?.id] || data?.text}
              onSave={(newText) => {
                setCommentTexts((prev) => ({
                  ...prev,
                  [data?.id]: newText,
                }))
                setEditingCommentId(null)
              }}
              onCancel={() => setEditingCommentId(null)}
            />
          ) : (
            <p className={styles.commentsBottomTextDescr}>{data?.text}</p>
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

      <PopupEditingMenu
        onEdit={() => {
          setEditingCommentId(data?.id)
          setCommentTexts((prev) => ({
            ...prev,
            [data?.id]: data?.text,
          }))
        }}
        onDelete={() => onDelete(data?.id)}
      />
    </div>
  )
}

export default Comment
