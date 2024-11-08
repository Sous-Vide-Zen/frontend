import { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import cn from 'clsx'

import styles from './RecipeCard.module.scss'
import { IRecipe } from '@/store/features/recipes/recipes.types'
import {
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} from '@/store/features/recipes/recipes.actions'
import { useData } from '@/hooks/useData'
import Reactions from '@/components/ui/Reactions/Reactions'
import Popup from '@/components/ui/Popup/Popup'

interface RecipeCardProps {
  recipe: IRecipe
  onPreview?: (slug: string) => void
  onRemoveFromFavorites?: (id: number) => void
}

const RecipeCard: FC<RecipeCardProps> = ({
  recipe,
  onPreview,
  onRemoveFromFavorites,
}) => {
  const { fancyDate } = useData(recipe.pub_date)
  const [udpateFavorite, setUpdateFavorite] = useState<boolean>(false)
  const [isFavorite, setIsFavorite] = useState<boolean>(recipe.is_favorite)
  const statusIsFavoriteUpdate = useRef<undefined | 'set' | 'reset'>()
  const [iLike, setILike] = useState(false)
  const [iShare, setIShare] = useState(false)

  const [addToFavorites, { status }] = useAddToFavoritesMutation()
  const [removeFromFavorites, { status: status2 }] =
    useRemoveFromFavoritesMutation()

  useEffect(() => {
    if (statusIsFavoriteUpdate.current === 'set' && status === 'fulfilled') {
      setIsFavorite(true)
      setUpdateFavorite(false)
      statusIsFavoriteUpdate.current = undefined
    }
    if (statusIsFavoriteUpdate.current === 'reset' && status2 === 'fulfilled') {
      setIsFavorite(false)
      setUpdateFavorite(false)
      statusIsFavoriteUpdate.current = undefined
    }
  }, [isFavorite, status, status2])

  const changeIsFavoriteHandler = () => {
    if (isFavorite) {
      removeFromFavorites(recipe.slug)
      statusIsFavoriteUpdate.current = 'reset'
      setUpdateFavorite(true)
      onRemoveFromFavorites && onRemoveFromFavorites(recipe.id)
    } else {
      addToFavorites(recipe.slug)
      statusIsFavoriteUpdate.current = 'set'
      setUpdateFavorite(true)
    }
  }

  const handlerOnTap = () => {
    onPreview && onPreview(recipe.slug)
  }

  // Вычисляем часы и минуты
  const cookingTime = recipe.cooking_time || 0
  const hours = Math.floor(cookingTime / 60)
  const minutes = cookingTime % 60

  return (
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
              alt={`avatar ${recipe.id}`}
              width={30}
              height={30}
              draggable={false}
            />
            <p>{recipe.author.username}</p>
          </div>
          <div className={styles.userRight}>
            <p>{fancyDate}</p>
          </div>
        </div>
      </div>
      <div className={styles.preview}>
        <button className={styles.previewPrinter}>
          <Image
            src="/img/recipe-card/printer.png"
            alt={`print ${recipe.id}`}
            width={28}
            height={28}
            draggable={false}
          />
        </button>
        <Image
          src={recipe.preview_image || '/img/recipe-card/empty-recipe.svg'}
          height={300}
          width={768}
          alt={`recipe image ${recipe.id}`}
          draggable={false}
          className={cn(styles.notPreview, {
            recipePreviewImg: true,
          })}
        />
        <button
          className={styles.previewSave}
          onClick={changeIsFavoriteHandler}
          disabled={udpateFavorite}
        >
          {udpateFavorite ? (
            <Image
              src="/img/loader.svg"
              alt="loader"
              width={26}
              height={26}
              draggable={false}
              priority
            />
          ) : (
            <Image
              src={`/img/recipe-card/${isFavorite ? 'save-filled.svg' : 'save.svg'}`}
              alt={`save ${recipe.id}`}
              width={26}
              height={26}
              draggable={false}
            />
          )}
        </button>
        <button
          className={cn(styles.previewTime, {
            [styles.tooltip]: true,
          })}
          onClick={handlerOnTap}
        >
          {hours > 0
            ? `${hours} ${hours === 1 || hours === 21 ? 'час' : (hours >= 2 && hours <= 4) || (hours >= 22 && hours <= 24) ? 'часа' : 'часов'} и ${minutes} ${minutes === 1 ? 'минута' : minutes >= 2 && minutes <= 4 ? 'минуты' : 'минут'}`
            : `${minutes} ${minutes === 1 || (minutes % 10 === 1 && minutes % 100 !== 11) ? 'минута' : (minutes >= 2 && minutes <= 4) || (minutes % 10 >= 2 && minutes % 10 <= 4 && minutes % 100 < 10) || minutes % 100 >= 20 ? 'минуты' : 'минут'}`}
          <span
            className={cn(styles.tooltiptext, {
              [styles.tooltipTop]: true,
            })}
          >
            Hажмите для предварительного просмотра
          </span>
        </button>
        {/* <Popup
          Content={() => (
            <button className={cn(styles.previewTime,
              'tooltip': true
            )} onClick={handlerOnTap}>
              {`${recipe.cooking_time} мин.`}
            </button>
          )}
          Tooltip={() => <div>нажмите для предварительного просмотра</div>}
        /> */}
      </div>

      <div className={styles.bottom}>
        <div className={styles.nameAndHash}>
          <div className={styles.name}>
            <p>{recipe.title}</p>
            <p>{recipe.short_text}</p>
          </div>
          <div className={styles.hash}>
            {recipe.tag.map((e: { name: string }) => (
              <span key={e.name}>{`#${e.name}`}</span>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            <Popup
              tooltipStyles={{
                maxWidth: '290px',
              }}
              Content={() => (
                <button className={styles.like}>
                  <Image
                    src={
                      iLike
                        ? '/img/recipe-card/fluent-emoji_heart-suit.svg'
                        : '/img/recipe-card/like.svg'
                    }
                    alt={`like button ${recipe.id}`}
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
                src="/img/recipe-card/comment.svg"
                alt={`comment button ${recipe.id}`}
                width={24}
                height={24}
                draggable={false}
              />
              {recipe.comments_count}
            </button>
            <button>
              <Image
                src={
                  iShare
                    ? '/img/recipe-card/ri_share-forward-fill.svg'
                    : '/img/recipe-card/share.svg'
                }
                alt={`share button ${recipe.id}`}
                width={24}
                height={24}
                draggable={false}
              />
              0{/*тут должно быть количество репостов*/}
            </button>
          </div>
          <div className={styles.footerRight}>
            <button>
              <Image
                src="/img/recipe-card/views.svg"
                alt={`views ${recipe.id}`}
                width={24}
                height={24}
                draggable={false}
              />
              {recipe.views_count}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
