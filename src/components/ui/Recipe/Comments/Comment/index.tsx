'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './ShowComment.module.scss'
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

const Comment: React.FC<CommentProps> = ({
  data,
  reactions,
  onDelete,
}) => {
  const userData = useAuth()

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [commentTexts, setCommentTexts] = useState<{ [key: number]: string }>(
    {},
  )

  const canEditOrDeleteComment = (comment: CommentData) => {
    const isAuthor = userData.id === comment.author.id
    const isWithin24Hours =
      new Date().getTime() - new Date(comment.pub_date).getTime() <
      24 * 60 * 60 * 1000

    return (isAuthor || userData.is_admin || userData.is_staff) && isWithin24Hours
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
    <div className={styles.commentsBottomContainer}>
      <div className={styles.commentsTopBox}>
        <div className={styles.commentsTextContent}>
          <div className={styles.commentsImgText}>
            <Image
              src={data?.author?.avatar ?? '/img/author.svg'}
              alt={data?.author?.username}
              className={styles.avatar}
              width={50}
              height={50}
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

      {canEditOrDeleteComment(data) && (
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
      )}
    </div>
  )
}

export default Comment
