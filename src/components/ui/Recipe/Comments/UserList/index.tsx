// 'use client'

// import React from 'react'
// import Image from 'next/image'
// import styles from './UserList.module.scss'

// // Определите интерфейс для автора
// interface Author {
//   id: number
//   username: string
//   display_name: string
//   avatar: string
// }

// // Определите интерфейс для комментария
// interface Comment {
//   id: number
//   author: Author
//   text: string
//   pub_date: string
//   updated_date: string
// }

// // Данные пользователей
// const usersData: Comment[] = [
//   {
//     id: 1,
//     author: {
//       id: 1,
//       username: 'Алина Устимова',
//       display_name: 'Alina Ustimova',
//       avatar: '/img/comments/png_1.png',
//     },
//     text: 'Безумно вкусно получается! Спасибо за рецепт))',
//     pub_date: '2023-03-15T12:10:00Z',
//     updated_date: '2023-03-15T12:10:00Z',
//   },

//   {
//     id: 2,
//     author: {
//       id: 2,
//       username: 'Сергей Петров',
//       display_name: 'Sergei Petrov',
//       avatar: '/img/comments/png_2.png',
//     },
//     text: 'Супер рецепт! Я еще добавляю кунжутное масло и 10/10',
//     pub_date: '2023-03-15T12:10:00Z',
//     updated_date: '2023-03-15T12:10:00Z',
//   },

//   {
//     id: 3,
//     author: {
//       id: 3,
//       username: 'lena_cook',
//       display_name: 'Lena Cook',
//       avatar: '/img/comments/png_3.png',
//     },
//     text: 'Легкий, но такой вкусный ужин. Рекомендую)',
//     pub_date: '2023-03-15T12:10:00Z',
//     updated_date: '2023-03-15T12:10:00Z',
//   },
// ]

// interface UserListProps {
//   comments: Comment[]
// }

// // const UserList: React.FC<UserListProps> = ({ comments }) => {
// //   return (
// //     <div className={styles.UserListContainer}>
// //       {usersData.length > 0 ? (
// //         comments.map((comment) => (
// //           <div key={comment.id}>
// //             <Image
// //               src={comment.author.avatar}
// //               alt={comment.author.username}
// //               className={styles.avatar}
// //               width={30}
// //               height={30}
// //             />
// //             <h4>{comment.author.username}</h4>
// //             <p>{comment.text}</p>
// //           </div>
// //         ))
// //       ) : (
// //         <p>Нет доступных комментариев</p>
// //       )}
// //     </div>
// //   )
// // }

// // export default UserList
