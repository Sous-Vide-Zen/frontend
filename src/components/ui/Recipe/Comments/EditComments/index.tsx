// 'use client'

// import { FC, useState } from 'react'
// import styles from './EditComments.module.scss'
// import EditComment from '@/components/ui/Recipe/Comments/EditComments/index'

// export type EditData = {
//   label: string
//   Content?: JSX.Element
// }

// export type EditProps = {
//   commentEdit: EditData[]
//   defaultEdit?: number
// }

// const editComment: FC<EditProps> = ({ commentEdit, defaultEdit }) => {
//   const [activeEdit, setActiveEdit] = useState(defaultEdit ?? 0)

//   const handleEditClick = (index: number) => {
//     setActiveEdit(index)
//   }

//  const comments = [
//     {
//       id: 2,
//       avatar: '/img/comments/png_2.png',
//       username: 'Сергей Петров',
//       text: 'Супер рецепт! Я еще добавляю кунжутное масло и 10/10',
//     },

//     {
//       id: 2,
//       avatar: '/img/comments/png_2.png',
//       username: 'Сергей Петров',
//       text: 'Супер рецепт! Я еще добавляю кунжутное масло и 10/10',
//     },
//     {
//       id: 3,
//       avatar: '/img/comments/png_3.png',
//       username: 'lena_cook',
//       text: 'Легкий, но такой вкусный ужин. Рекомендую)',
//     },
//   ]

//   return (
//     <div className={styles.container}>
//       <div className={styles.linkEditingMenu}>
//         {commentEdit.map((edit, index) => (
//           <EditComment
//             key={index}
//             label={edit.label}
//             onClick={() => handleEditClick(index)}
//             isActive={index === activeEdit}
//           />
//         ))}
//       </div>
//       <div className={styles.content}>{commentEdit[activeEdit]?.Content}</div>
//     </div>
//   )
// }

// export default editComment

// // interface EditCommentProps {
// //   currentText: string
  // onSave: (newText: string) => void
// // }

// // const EditComment: React.FC<EditCommentProps> = ({ currentText, onSave }) => {
// //   const [text, setText] = useState(currentText)

// //   const handleSave = () => {
// //     onSave(text)
// //   }

// //   return (
// //     <div className={styles.editCommentContainer}>
// //       <input
// //         type="text"
// //         value={text}
// //         onChange={(e) => setText(e.target.value)}
// //         className={styles.editCommentInput}
// //       />
// //       <button onClick={handleSave} className={styles.saveButton}>
// //         Сохранить
// //       </button>
// //     </div>
// //   )
// // }

// // export default EditComment

'use client'

import { FC, useState } from 'react'
import styles from './EditComments.module.scss'
import EdittedComment from '@/components/ui/Recipe/Comments/EditComments/index'

export type EditData = {
  label: string //строка, которая представляет название или метку комментария.
  Content?: JSX.Element //JSX-элемент, представляющий контент комментария(необязательное поле)
}

export type EditProps = {
  commentEdit: EditData[] //массив объектов
  label: string //строка, представляющая метку
  defaultEdit?: number //необязательное число, представляющее индекс по умолчанию для редактируемого комментария.
}

const EditComment: FC<EditProps> = ({ commentEdit, defaultEdit }) => {
  const [activeEdit, setActiveEdit] = useState(defaultEdit ?? 0) // Использует хук состояния useState, чтобы хранить индекс
  // активного редактируемого комментария.Если defaultEdit не задан, по умолчанию будет выбран первый комментарий (индекс 0).

  const handleEditClick = (index: number) => {
    setActiveEdit(index) //Функция, которая обновляет состояние activeEdit на индекс комментария, по которому кликнули.
  }

  const comments = [
    {
      id: 1,
      avatar: '/img/comments/png_1.png',
      username: 'Алина Устимова (Вы)',
      text: 'Безумно вкусно получается! Спасибо за рецепт))',
      // onClick: () => {},
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
  ]

  /*
  Внутри div с классом styles.linkEditingMenu происходит итерация по массиву
      commentEdit с помощью map(). Для каждого комментария создается компонент
      EdittedComment, которому передаются: key: уникальный ключ для каждого
      элемента (используется индекс). label: метка комментария. onClick:
      обработчик клика, который вызывает handleEditClick с индексом комментария.
      isActive: булевое значение, указывающее, является ли данный комментарий
      активным (т.е. совпадает ли его индекс с activeEdit).
  */

  return (
    <div className={styles.container}>
      <div className={styles.commentEdit}>
        {commentEdit.map((comment, index) => (
          <EdittedComment
            key={index} // Использование индекса, если нет уникального идентификатора
            label={comment.label}
            onClick={() => handleEditClick(index)} // Используем индекс для обработки клика
            isActive={index === activeEdit} // Сравниваем с индексом
          />
        ))}
      </div>
      <div className={styles.content}>
        {commentEdit[activeEdit]?.Content ||
          'Выберите комментарий для редактирования.'}
      </div>
    </div>
  )
}

export default EditComment
