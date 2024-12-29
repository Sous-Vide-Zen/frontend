'use client'

import Image from 'next/image'
import styles from './comments.module.scss'
import { useState } from 'react'
import { MenyMyself } from '@/components/ui/Recipe/MenuMyself/index'

export default function Comments() {
  const [commentText, setCommentText] = useState('')
  console.log(commentText)

  /*массив с объектами для каждой иконки*/

  const reactions = [
    { src: '/img/reactions/heart.svg', alt: 'heart', count: 120 },
    { src: '/img/reactions/thumb-up.svg', alt: 'thumb-up', count: 13 },
    { src: '/img/reactions/thumb-down.svg', alt: 'thumb-down', count: 3 },
    { src: '/img/reactions/angry-face.svg', alt: 'angry-face', count: 0 },
    { src: '/img/reactions/fire.svg', alt: 'fire', count: 24 },
  ]

  const result = [
    {
      avatar: '/img/comments/png_1.png',
      username: 'Алина Устимова (Вы)',
      text: 'Безумно вкусно получается! Спасибо за рецепт))',
    },
    {
      avatar: '/img/comments/png_2.png',
      username: 'Сергей Петров',
      text: 'Супер рецепт! Я еще добавляю кунжутное масло и 10/10',
    },
    {
      avatar: '/img/comments/png_3.png',
      username: 'lena_cook',
      text: 'Легкий, но такой вкусный ужин. Рекомендую)',
    },
  ]

  return (
    <div className={styles.commentsWrapper}>
      <p className={styles.commentsTitle}>Комментарии</p>
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
      {result.map((results, item) => (
        <div key={item}>
          <div className={styles.commentsBottomContainer}>
            <div className={styles.commentsTopBox}>
              <div className={styles.commentsBottomContent}>
                <div className={styles.commentsImgText}>
                  <Image
                    src={results.avatar}
                    alt={results.username}
                    className={styles.avatar}
                    width={20}
                    height={20}
                  />
                  <p className={styles.commentsNameText}>{results.username}</p>
                </div>
                <div className={styles.containerButton}>
                  <MenyMyself />
                </div>
                <p className={styles.commentsBottomTextDescr}>{results.text}</p>
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
        </div>
      ))}
    </div>
  )
}
