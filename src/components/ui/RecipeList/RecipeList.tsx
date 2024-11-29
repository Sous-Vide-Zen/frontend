'use client'

import { FC, Fragment, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import cn from 'clsx'

import styles from './RecipeList.module.scss'
import { RecipeListView } from '@/store/features/user/user.slice'
import { RecipeListResult } from '@/hooks/dispatcher.types'
import {
  RecipeCard,
  ListLoader,
  ListLoadingError,
  RecipeSkeleton,
} from '@/components/ui'
import EmptyRecipeList from './EmptyRecipeList'

type Props = {
  dispatcher: RecipeListResult
  view: RecipeListView
  removeItemsOnRemoveFromFavorites?: boolean
  onChangeTotal?: (count?: number) => void
}

const RecipeList: FC<Props> = ({
  dispatcher,
  view,
  removeItemsOnRemoveFromFavorites,
  onChangeTotal,
}) => {
  const loaderRef = useRef(null)
  const [removedItems, setRemovedItems] = useState<number[]>([])

  const router = useRouter()
  const { recipies, loadNextPageRef, isFetching, isLoading, error, total } =
    dispatcher

  const toggleIngredients = (slug: string) => router.push(`/recipe/${slug}`)

  const onRemoveFromFavorites = (id: number) => {
    if (!removeItemsOnRemoveFromFavorites) return

    removedItems.push(id)
    setRemovedItems(removedItems)
  }

  // отслеживаем скроллинг и догружаем элементы списка
  useEffect(() => {
    // хранит ссылку на обсервер, чтоб потом отписаться при удалении компонента
    let observerRefValue = null

    // здесь отслеживается момент достижения скролом элемента с loaderRef
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0]
      target.isIntersecting && loadNextPageRef.current()
    })

    // подписка на отслеживание
    if (loaderRef.current) {
      observer.observe(loaderRef.current)
      observerRefValue = loaderRef.current
    }

    // отмена подписки на отслеживание (для устранения утечки памяти) при удалении компонента
    return () => {
      if (observerRefValue) observer.unobserve(observerRefValue)
    }
  }, [loadNextPageRef])

  useEffect(() => {
    onChangeTotal && onChangeTotal(total)
  }, [onChangeTotal, total])

  let content: React.ReactNode = null

  if (isLoading)
    content = (
      <>
        <RecipeSkeleton />
        <RecipeSkeleton />
        <RecipeSkeleton />
      </>
    )

  if (error) content = <ListLoadingError error={error.data?.detail} />

  if (!recipies?.length && !isFetching) content = <EmptyRecipeList />

  if (recipies && recipies.length)
    content = recipies
      .filter((e) => !removedItems.includes(e.id))
      .map((recipe) => (
        <Fragment key={recipe.id}>
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onPreview={toggleIngredients}
            onRemoveFromFavorites={onRemoveFromFavorites}
          />
        </Fragment>
      ))

  return (
    <div className={styles.container}>
      <div
        className={cn(styles.wrapper, {
          ['tile']: view !== 'feed',
        })}
      >
        {content}
        <div ref={loaderRef}>
          {!isLoading && isFetching && <ListLoader />}&nbsp;
        </div>
      </div>
    </div>
  )
}

export default RecipeList
