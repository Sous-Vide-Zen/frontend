// 'use client'

// import React, { useState } from 'react'
// import Image from 'next/image'
// import styles from './Comment.module.scss'
// import EditComment from '@/components/ui/Recipe/Comments/EditComments/index'
// import { PopupEditingMenu } from '@/components/ui/Recipe/Comments/PopupEditingMenu'
// import { CommentData } from '@/store/features/comments/comments.types'
// import { useAuth } from '@/hooks/useAuth'

// interface CommentProps {
//   data: CommentData
//   reactions: {
//     src: string
//     alt: string
//     count: number
//   }[]
//   onDelete: (id: number) => void
// }

// const Comment: React.FC<CommentProps> = ({ data, reactions, onDelete }) => {
//   const userData = useAuth()

//   const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
//   const [commentTexts, setCommentTexts] = useState<{ [key: number]: string }>(
//     {},
//   )

//   // canEditOrDeleteComment = true

//   const canEditOrDeleteComment = (comment: CommentData) => {
//     const isAuthor = userData.id === comment.author.id
//     const isWithin24Hours =
//       new Date().getTime() - new Date(comment.pub_date).getTime() <
//       24 * 60 * 60 * 1000

//     return (
//       (isAuthor || userData.is_admin || userData.is_staff) && isWithin24Hours
//     )
//   }

//   return (
//     <div className={styles.commentsBottomContainer}>
//       <div className={styles.commentsTopBox}>
//         <div className={styles.commentsTextContent}>
//           <div className={styles.commentsImgText}>
//             <Image
//               src={data?.author?.avatar ?? '/img/author.svg'}
//               alt={data?.author?.username}
//               className={styles.avatar}
//               width={20}
//               height={20}
//             />
//             <p className={styles.commentsNameText}>{data?.author?.username}</p>
//           </div>
//           {editingCommentId === data?.id ? (
//             <EditComment
//               initialText={commentTexts[data?.id] || data?.text}
//               onSave={(newText) => {
//                 setCommentTexts((prev) => ({
//                   ...prev,
//                   [data?.id]: newText,
//                 }))
//                 setEditingCommentId(null)
//               }}
//               onCancel={() => setEditingCommentId(null)}
//             />
//           ) : (
//             <p className={styles.commentsBottomTextDescr}>{data?.text}</p>
//           )}
//         </div>
//       </div>
//       <div className={styles.commentsBottomBox}>
//         <button className={styles.commentsBtn}>Ответить</button>
//         <div className={styles.commentsReactionsContent}>
//           {reactions.map((reaction, index) => (
//             <div key={index} className={styles.reactionItem}>
//               <Image
//                 src={reaction.src}
//                 alt={reaction.alt}
//                 width={24}
//                 height={24}
//               />
//               <p className={styles.commentsReactionsIconsText}>
//                 {reaction.count}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {canEditOrDeleteComment(data) && (
//         <PopupEditingMenu
//           onEdit={() => {
//             setEditingCommentId(data?.id)
//             setCommentTexts((prev) => ({
//               ...prev,
//               [data?.id]: data?.text,
//             }))
//           }}
//           onDelete={() => onDelete(data?.id)}
//         />
//       )}
//     </div>
//   )
// }

// export default Comment

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

  // ==================================================================================//
  // Если прошло не более 24 часов:

  // Модератор может удалять чужие комментарии, а свои комментарии может и редактировать и удалять;

  // Автор комментария может редактировать комментарии
  // Администратор может редактировать и удалять свой/чужой комментарий

  // Если прошло более 24 часов:

  // Удалять могут:  автор комментария, администратор и модератор
  // ======================================================================================//

  const canEditOrDeleteComment = (comment: CommentData) => {
    const isAuthor = userData.id === comment.author.id
    const isAdmin = userData.is_admin
    const isModerator = userData.is_staff

    const commentDate = new Date(comment.pub_date)
    const isWithin24Hours =
      new Date().getTime() - commentDate.getTime() < 24 * 60 * 60 * 1000

    if (isModerator && isWithin24Hours) {
      return true // Модератор может удалять свой/чужой комментарий в течение 24 часов
    } else if (isAdmin && isWithin24Hours) {
      return true // Администратор может редактировать/удалять свой/чужой комментарий
    } else if (isAuthor && isWithin24Hours) {
      return true // Автор может редактировать комментарий в течение 24 часов
    } else if ((isAuthor || isAdmin || isModerator) && !isWithin24Hours) {
      return true // Автор, администратор или модератор может удалять комментарий, если прошло более 24 часов
    }
    return false // Если ни одно из условий не выполнено, возвращаем false
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
