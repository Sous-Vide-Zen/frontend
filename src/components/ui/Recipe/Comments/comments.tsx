'use client'

import { FC, useState, useEffect } from 'react'
import styles from './comments.module.scss'
import DeleteComment from '@/components/ui/Recipe/Comments/DeleteComments/index'
import { useGetRecipeCommentsQuery } from '@/store/features/comments/comments.actions'
import AddNewComment from './AddNewComment'
import Comment from './Comment'
import { CommentData } from '@/store/features/comments/comments.types'
import { useAuth } from '@/hooks/useAuth'

type Props = {
  slug: string
}

const Comments: FC<Props> = ({ slug }) => {
  const userData = useAuth()

  const reactions = [
    { src: '/img/reactions/heart.svg', alt: 'heart', count: 120 },
    { src: '/img/reactions/thumb-up.svg', alt: 'thumb-up', count: 13 },
    { src: '/img/reactions/thumb-down.svg', alt: 'thumb-down', count: 3 },
    { src: '/img/reactions/angry-face.svg', alt: 'angry-face', count: 0 },
    { src: '/img/reactions/fire.svg', alt: 'fire', count: 24 },
  ]

  // Инициализация состояния с правильным типом
  const [comments, setComments] = useState<CommentData[]>([])
  const { data } = useGetRecipeCommentsQuery(slug)

  useEffect(() => {
    if (data) {
      setComments(data.results)
    }
  }, [data])

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null)
  const [commentTexts, setCommentTexts] = useState<{ [key: number]: string }>(
    {},
  )

  const [commentText, setCommentText] = useState('')

  //обработчики клика
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value)
  }

  const handleSaveComment = (id: number, newText: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, text: newText } : comment,
      ),
    )
    setEditingCommentId(null)
  }

  // const handleEditComment = (id: number, currentText: string) => {
  //   setEditingCommentId(id)
  //   setCommentTexts({ ...commentTexts, [id]: currentText })
  // }

  // const handleCancelEdit = () => {
  //   setEditingCommentId(null)
  // }

  const handleDeleteComment = (id: number) => {
    setCommentToDelete(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDeleteComment = () => {
    if (commentToDelete !== null) {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentToDelete),
      )
      setCommentToDelete(null)
      setIsDeleteModalOpen(false)
    }
  }

  const cancelDelete = () => {
    setCommentToDelete(null)
    setIsDeleteModalOpen(false)
  }

  // const canEditComment = (comment: CommentData) => {
  //   const isAuthor = currentUser.id === comment.author.id
  //   const isAdmin = currentUser.role === 'admin'
  //   const isWithin24Hours =
  //     new Date().getTime() - new Date(comment.pub_date).getTime() <
  //     24 * 60 * 60 * 1000

  //   return isAuthor || (isAdmin && isWithin24Hours)
  // }

  // const canDeleteComment = (comment: CommentData) => {
  // const isAuthor = currentUser.id === comment.author.id
  // const isAdmin = currentUser.role === 'admin'
  // const isModerator = currentUser.role === 'moderator'
  // const isAfter24Hours =
  //   new Date().getTime() - new Date(comment.pub_date).getTime() >
  //   24 * 60 * 60 * 1000

  // return (isAuthor || isAdmin || isModerator) && isAfter24Hours
  // }

  // const currentUser = {
  //   id: userData?.id,
  //   role: userData?.role,
  // }

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
  if (comments.length === 0) {
    setComments(InitialComment)
  }

  return (
    <div className={styles.commentsWrapper}>
      <h4 className={styles.commentsTitle}>Комментарии</h4>

      {/*добавление нового комментария*/}
      <AddNewComment
        onCommentChange={handleCommentChange}
        commentText={commentText}
      />

      {/*отображение списка комментариев*/}
      <ul className={styles.commentsList}>
        {comments.map((comment: CommentData) => (
          <li key={comment.id} className={styles.commentsItem}>
            <Comment
              data={comment}
              reactions={reactions}
              onDelete={handleDeleteComment}
            />
          </li>
        ))}
      </ul>

      {/*удаление комментария*/}
      {isDeleteModalOpen && (
        <DeleteComment
          onConfirm={confirmDeleteComment}
          onCancel={cancelDelete}
        />
      )}
    </div>
  )
}
export default Comments
