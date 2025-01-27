'use client'

import Image from 'next/image'
import styles from './comments.module.scss'
import { FC, useEffect, useState } from 'react'
import EditComment from './EditComments'
import DeleteComment from '@/components/ui/Recipe/Comments/DeleteComments/index'
import { PopupEditingMenu } from '@/components/ui/Recipe/Comments/PopupEditingMenu'
import { useGetRecipeCommentsQuery } from '@/store/features/comments/comments.actions'
import { CommentData } from '@/store/features/comments/comments.types'
import { Reactions } from '../../Reactions'
import { useAuth } from '@/hooks/useAuth'

type Props = {
  slug: string
}

const Comments: FC<Props> = ({ slug }) => {
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
  const { data } = useGetRecipeCommentsQuery(slug)
  const { id } = useAuth()

  const [comments, setComments] = useState<CommentData[]>([])

  useEffect(() => {
    console.log({ data })
    setComments(data?.results ?? [])
  }, [data])

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
    // if (commentToDelete !== null) {
    //   setComments(
    //     comments.filter((comments) => comments.id !== commentToDelete),
    //   )
    //   setCommentToDelete(null)
    //   setIsDeleteModalOpen(false)
    // }
  }

  const canEditComment = (comment: CommentData) => {
    const isAuthor = currentUser.id === comment.author.id
    const isAdmin = currentUser.role === 'admin'
    const isWithin24Hours =
      new Date().getTime() - new Date(comment.pub_date).getTime() <
      24 * 60 * 60 * 1000

    return isAuthor || (isAdmin && isWithin24Hours)
  }

  const canDeleteComment = (comment: CommentData) => {
    const isAuthor = currentUser.id === comment.author.id
    const isAdmin = currentUser.role === 'admin'
    const isModerator = currentUser.role === 'moderator'
    const isAfter24Hours =
      new Date().getTime() - new Date(comment.pub_date).getTime() >
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

              {/* следует выделить в компонент Рецепт */}
              <div className={styles.commentsBottomContainer}>
                <div className={styles.commentsTopBox}>
                  <div className={styles.commentsTextContent}>
                    <div className={styles.commentsImgText}>
                      <Image
                        src={comment.author.avatar ?? ''}
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
                    {id === comment.author.id ? (
                      <EditComment
                        initialText={comment.text}
                        onSave={(newText) =>
                          handleSaveComment(comment.id, newText)
                        }
                      />
                    ) : (
                      <p className={styles.commentsBottomTextDescr}>
                        {commentTexts[comment.id] || comment.text}
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

export default Comments
