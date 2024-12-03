'use client'
import { FC } from 'react'
import { IRecipeWithIngredients } from '@/store/features/recipes/recipes.types'
import styles from './userNameShow.module.scss'
import Image from 'next/image'
import { useData } from '@/hooks/useData'

interface RecipeCardProps {
  recipe: IRecipeWithIngredients
}

const UserNameShow: FC<RecipeCardProps> = ({ recipe }) => {
  const { timeAgo, formattedDate } = useData(recipe?.pub_date ?? '')

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
        <p>{recipe.author.username}</p>
      </div>
      <div className={styles.userRight}>
        <p>{timeAgo}</p>
      </div>
      {/* </div> */}
    </div>
  )
}
export default UserNameShow
