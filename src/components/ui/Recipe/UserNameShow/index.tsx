'use client'

import { FC } from 'react'
import Image from 'next/image'

import styles from './userNameShow.module.scss'
import { RecipeFull } from '@/store/features/recipes/recipes.types'
import { useData } from '@/hooks/useData'
import { MenyMyself } from '../MenuMyself'
import { MenuSomeone } from '../MenuSomeone'

//todo: меню показывать только для зарегистрированного пользователя!

type RecipeCardProps = Partial<
  Pick<RecipeFull, 'author' | 'pub_date' | 'slug'>
> & {
  allowEdit: boolean
  isMyRecipe: boolean
  readOnly: boolean
  olderThan24Hours: boolean
}

export const UserNameShow: FC<RecipeCardProps> = ({
  allowEdit,
  isMyRecipe,
  readOnly,
  author,
  pub_date,
  slug,
  olderThan24Hours,
}) => {
  const { timeAgo, formattedDate } = useData(pub_date ?? '')

  return (
    <div className={styles.container}>
      {/* <div className={styles.userWrapper}> */}
      <div className={styles.user}>
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
      <div className={styles.timeAndMenu}>
        <p>{timeAgo}</p>
        {readOnly &&
          (isMyRecipe ? (
            <MenyMyself
              slug={slug}
              allowEdit={allowEdit}
              isMyRecipe={isMyRecipe}
              olderThan24Hours={olderThan24Hours}
            />
          ) : (
            <MenuSomeone slug={slug} />
          ))}
      </div>
    </div>
  )
}
