import { FC } from 'react'
import Image from 'next/image'
import styles from './Reactions.module.scss'
import { useGetRecipeReactionsQuery } from '@/store/features/reactions/reactions.actions'

interface ReactionsProps {
  slug: string
}

const Reactions: FC<ReactionsProps> = ({ slug }) => {
  const { data, error } = useGetRecipeReactionsQuery(slug)

  const onHeartClick = () => {
    console.log('heart')
  }

  const onLikeClick = () => {
    console.log('like')
  }

  const onDislikeClick = () => {
    console.log('dislike')
  }

  const onAngryFaceClick = () => {
    console.log('angry_face')
  }

  const onFireClick = () => {
    console.log('fire')
  }

  //todo можно придумать дазайн для этого, например скелетоны
  if (!data)
    return error ? (
      <div className={styles.reactions}>ошибка</div>
    ) : (
      <div className={styles.reactions}>загрузка...</div>
    )

  const { reactions } = data

  return (
    <div className={styles.reactions}>
      <button>
        <Image
          src="/img/reactions/heart.svg"
          alt="views"
          width={24}
          height={24}
          draggable={false}
          onClick={onHeartClick}
        />
        {reactions?.Heart ?? 0}
      </button>
      <button>
        <Image
          src="/img/reactions/thumb-up.svg"
          alt="views"
          width={24}
          height={24}
          draggable={false}
          onClick={onLikeClick}
        />
        {reactions?.Like ?? 0}
      </button>
      <button>
        <Image
          src="/img/reactions/thumb-down.svg"
          alt="views"
          width={24}
          height={24}
          draggable={false}
          onClick={onDislikeClick}
        />
        {reactions?.Dislike ?? 0}
      </button>
      <button>
        <Image
          src="/img/reactions/angry-face.svg"
          alt="views"
          width={24}
          height={24}
          draggable={false}
          onClick={onAngryFaceClick}
        />
        {reactions?.Angry_Face ?? 0}
      </button>
      <button>
        <Image
          src="/img/reactions/fire.svg"
          alt="views"
          width={24}
          height={24}
          draggable={false}
          onClick={onFireClick}
        />
        {reactions?.Fire ?? 0}
      </button>
    </div>
  )
}

export default Reactions
