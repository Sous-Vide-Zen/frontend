import { FC } from 'react'
import Image from 'next/image'
import styles from './Reactions.module.scss'
import { useGetRecipeReactionsQuery } from '@/store/features/reactions/reactions.actions'

interface ReactionsProps {
  slug: string
}

const Reactions: FC<ReactionsProps> = ({ slug }) => {
  const { data } = useGetRecipeReactionsQuery(slug)
  const { reactions } = data ?? {}

  const onHeartClick = () => {
    console.log('heart')
  }

  const onLikeClick = () => {
    console.log('like')
  }

  const onDislikeClick = () => {
    console.log('dislike')
  }

  const onFireClick = () => {
    console.log('fire')
  }

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
          src="/img/reactions/evil.svg"
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
