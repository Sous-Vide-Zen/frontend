'use client'

import { FC, useState, useEffect } from 'react'
import { IRecipe } from '@/store/features/recipes/recipes.types'
import Image from 'next/image'
import styles from './RecipeModify.module.scss'
import { useData } from '@/hooks/useData'
import Reactions from '@/components/ui/Reactions/Reactions'
import Popup from '@/components/ui/Popup/Popup'
import { useGetRecipeQuery } from '@/store/features/recipes/recipes.actions'
// import IngredientsShowEndAdd from '@/components/ui/RecipeComponents/IngredientsShowEndAdd/ingredientsShowEndAdd'
// import TimeShowEndAdd from '@/components/ui/RecipeComponents/TimeShowEndAdd/timeShowEndAdd'
import Link from 'next/link'
import AddNewRecipe from '@/app/add-new-recipe/page'

interface IRecipeWithIngredients extends IRecipe {
  ingredients: any[]
  full_text: string
}
interface RecipeCardProps {
  recipe?: IRecipeWithIngredients
  // readonly?: boolean
  // onClose?: () => void
  // slug?: string
  // pub_date:? string
}

const RecipeModify: FC<RecipeCardProps> = ({ recipe }) => {
  // const [showMediaIcons, setShowMediaIcons] = useState<boolean>(false)
  const { timeAgo, formattedDate } = useData(recipe?.pub_date ?? '')
  const [active, setActive] = useState(false)
  // const [register2, setRegister2] = useState<any>(null)

  const handleToggle = () => {
    setActive((prevValue) => !prevValue)
  }

  const changeIsFavoriteHandler = () => {
    console.log('function work')
    // todo - надо ли для нового рецепта далать добавление его в избранное?
  }

  const onPrinterClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    changeIsFavoriteHandler()
  }

  if (recipe)
    return (
      <div>
        <div className={styles.recipe}>
          <div className={styles.user}>
            <div className={styles.userWrapper}>
              <div className={styles.userLeft}>
                {/*проверка на аватарку*/}
                {/*{recipe?.author?.avatar ?*/}
                {/*    <Image src={recipe.author.avatar} alt='avatar' width={30} height={30} draggable={false}/> :*/}
                {/*    <Image src='/img/recipe-card/profile.png' alt='avatar' width={30} height={30}*/}
                {/*           draggable={false}/>}*/}
                <Image
                  src="/img/recipe-card/profile.svg"
                  alt="avatar"
                  width={30}
                  height={30}
                  draggable={false}
                />
                <p>{recipe.author.username}</p>
              </div>
              <div className={styles.userRight}>
                <p>{timeAgo}</p>
              </div>
            </div>
          </div>
          {/* string of views likes and need to add edit and delete */}
          <div className={styles.bottom}>
            <div className={styles.footer}>
              <div className={styles.footerLeft}>
                <button>
                  <Image
                    src="/img/recipe-card/views.svg"
                    alt="views"
                    width={24}
                    height={24}
                    draggable={false}
                  />
                  {recipe.views_count}
                </button>
                <Popup
                  Content={() => (
                    <button className={styles.like}>
                      <Image
                        src="/img/recipe-card/like.svg"
                        alt="like button"
                        width={24}
                        height={24}
                        draggable={false}
                      />
                      {recipe.reactions_count}
                    </button>
                  )}
                  Tooltip={() => <Reactions slug={recipe.slug} />}
                />
                <button>
                  <Image
                    src="/img/recipe-card/share.svg"
                    alt="share button"
                    width={24}
                    height={24}
                    draggable={false}
                  />
                  0{/*тут должно быть количество репостов*/}
                </button>
              </div>
            </div>
          </div>
          {/* photo of the dishes that you need to add an icon in the lower left corner */}
          <div className={styles.preview}>
            <div className={styles.container_button}>
              <div
                className={styles.dropdownIcon}
                onClick={() => handleToggle()}
              >
                &#8942;
              </div>
              {active && (
                <div className={styles.button_wrapper}>
                  <Link href={`/recipe/edit/${recipe.slug}`}>
                    Редактировать рецепт.
                  </Link>
                  <span>test string</span>
                </div>
              )}
            </div>
            <div className={styles.wrapper_icon}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className={styles.previewLink}
              >
                <Image
                  src="/img/recipe-card/link.png"
                  alt="save"
                  width={28}
                  height={28}
                  draggable={false}
                />
              </button>
              <button
                className={styles.previewPrinter}
                onClick={onPrinterClick}
              >
                <Image
                  src="/img/recipe-card/printer.png"
                  alt="printer"
                  width={26}
                  height={26}
                  draggable={false}
                />
              </button>
            </div>
            {recipe.preview_image ? (
              <Image
                src={recipe.preview_image}
                height={300}
                alt="recipe image"
                draggable={false}
                className={styles.notPreview}
              />
            ) : (
              <div className={styles.notPreview}></div>
            )}
          </div>
          <AddNewRecipe recipe={recipe} notShowProps={true} />
        </div>
      </div>
    )
  else return 'no - data'
}

export default RecipeModify
