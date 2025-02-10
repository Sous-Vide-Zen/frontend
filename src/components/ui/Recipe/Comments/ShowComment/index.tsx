'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './ShowComment.module.scss'
import EditComment from '@/components/ui/Recipe/Comments/EditComments/index'
import { PopupEditingMenu } from '@/components/ui/Recipe/Comments/PopupEditingMenu'
import {
  DataResponse,
  ListResponse,
  ListResponseSuccess,
  Author as CommonAuthor,
} from '@/store/features/common.types'

// Определение типа Author
interface Author {
  id: number
  username: string
  display_name: string
  avatar: string
}

// Определение типа CommentData
interface CommentData {
  id: number
  author: CommonAuthor
  text: string
  pub_date: string
  updated_date: string
}

// Определение типа Reaction
type Reaction = {
  src: string
  alt: string
  count: number
}

interface ShowCommentProps {
  comments: CommentData[]
  reactions: Reaction[]
  onDelete: (id: number) => void
}

const ShowComment: React.FC<ShowCommentProps> = ({
  comments,
  reactions,
  onDelete,
}) => {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [commentTexts, setCommentTexts] = useState<{ [key: number]: string }>(
    {},
  )

  return (
    <ul className={styles.commentsList}>
      {comments.map((comment) => (
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
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ShowComment
