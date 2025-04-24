import { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import styles from './RecipeCard.module.scss'
import { RecipeFeed } from '@/store/features/feedAndFavorites/feedAndFavorites.types'
import {
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} from '@/store/features/feedAndFavorites/feedAndFavorites.actions'
import { useData } from '@/hooks/useData'
import { Reactions, Popup } from '@/components/ui'
import { RecipeCardPhoto } from './RecipeCardPhoto'
import { RecipeHash } from './RecipeHash'
import { useAuth } from '@/hooks/useAuth'
import { LoginOrRegisterModal } from '@/components/ui/LoginOrRegisterModal'

interface RecipeCardProps {
  recipe: RecipeFeed
  onPreview?: (slug: string) => void
  onRemoveFromFavorites?: (id: number) => void
}

export const RecipeCard: FC<RecipeCardProps> = ({
  recipe,
  onPreview,
  onRemoveFromFavorites,
}) => {
  const { isAuth } = useAuth()
  const { fancyDate } = useData(recipe.pub_date)
  const [updateFavorite, setUpdateFavorite] = useState<boolean>(false)
  const [isFavorite, setIsFavorite] = useState<boolean>(recipe.is_favorite)
  const statusIsFavoriteUpdate = useRef<undefined | 'set' | 'reset'>()
  const [iLike, setILike] = useState(false)
  const [iShare, setIShare] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [addToFavorites, { status }] = useAddToFavoritesMutation()
  const [removeFromFavorites, { status: status2 }] =
    useRemoveFromFavoritesMutation()

  const handleShowLoginModal = () => {
    setIsModalOpen(true)
  }

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
    if (!isAuth) {
      setIsModalOpen(true)
      return
    }

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

  const router = useRouter()
  const editingDraft = (slug: string) => router.push(`/recipe/new?${slug}`)

  return (
    <div className={styles.recipe}>
      <div className={styles.user}>
        <div className={styles.userWrapper}>
          <div className={styles.userLeft}>
            <Image
              src="/img/recipe-card/profile.svg"
              alt={`avatar ${recipe.id}`}
              width={30}
              height={30}
              draggable={false}
            />
            <p>{recipe.author.display_name ?? recipe.author.username}</p>
          </div>
          <div className={styles.userRight}>
            <p>{fancyDate}</p>
          </div>
        </div>
      </div>
      <div className={styles.preview}>
        <RecipeCardPhoto
          id={recipe.id}
          isFavorite={isFavorite}
          updateFavorite={updateFavorite}
          cooking_time={recipe.cooking_time}
          onFavoriteClick={changeIsFavoriteHandler}
          onButtonClick={handlerOnTap}
          isAuthenticated={isAuthenticated}
          showLoginModal={handleShowLoginModal}
        />
      </div>

      <div className={styles.bottom}>
        <div className={styles.nameAndHash}>
          <div
            className={styles.name}
            onClick={() => editingDraft(`${recipe.slug}`)}
          >
            <p>{recipe.title}</p>
            <p>{recipe.short_text}</p>
          </div>
          <div className={styles.hash}>
            <RecipeHash tag={recipe.tag} />
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
              0{/* здесь должно быть количество репостов */}
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

      <LoginOrRegisterModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  )
}
