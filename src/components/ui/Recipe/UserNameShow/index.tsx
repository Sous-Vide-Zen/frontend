'use client'

import { FC } from 'react'
import Image from 'next/image'

import styles from './userNameShow.module.scss'
import { RecipeFull } from '@/store/features/recipes/recipes.types'
import { useData } from '@/hooks/useData'

type RecipeCardProps = Partial<Pick<RecipeFull, 'author' | 'pub_date'>>

export const UserNameShow: FC<RecipeCardProps> = ({ author, pub_date }) => {
  const { timeAgo, formattedDate } = useData(pub_date ?? '')

  return (
    <div className={styles.user}>
      {/* <div className={styles.userWrapper}> */}
      <div className={styles.userLeft}>
        {/*проверка на аватарку*/}
        {/*{recipe?.author?.avatar ?*/}
        {/*    <Image src={recipe.author.avatar} alt='avatar' width={30} height={30} draggable={false}/> :*/}
        {/*    <Image src='/img/recipe-card/profile.png' alt='avatar' width={30} height={30}*/}
        {/*           draggable={false}/>}*/}
        <Image
          src="/img/recipe-card/profile.svg"
          alt="avatar"
          width={80}
          height={80}
          draggable={false}
        />
        <p>{author?.username}</p>
      </div>
      <div className={styles.userRight}>
        <p>{timeAgo}</p>
      </div>
      {/* </div> */}
    </div>
  )
}
