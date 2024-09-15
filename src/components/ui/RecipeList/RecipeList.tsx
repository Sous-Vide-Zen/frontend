'use client'

import { FC, Fragment, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import cn from 'clsx'

import styles from './RecipeList.module.scss'
import { RecipeListView } from '@/store/features/user/user.slice'
import { RecipeListResult } from '@/hooks/dispatcher.types'
import RecipeCard from '@/components/ui/RecipeCard/RecipeCard'
import ListLoader from '@/components/ui/ListLoader/ListLoader'
import { ListLoadingError } from '@/components/ui/ListLoadingError/ListLoadingError'
import EmptyRecipeList from './EmptyRecipeList'
import { RecipeSkeleton } from '../Skeletons/skeletons'

const RecipeList: FC<{
  dispatcher: RecipeListResult
  view: RecipeListView
}> = ({ dispatcher, view }) => {
  const loaderRef = useRef(null)

  const router = useRouter()
  const { recipies, loadNextPageRef, isFetching, isLoading, error } = dispatcher

  const toggleIngredients = (slug: string) => router.push(`/recipe/${slug}`)

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

  const ListSkeleton = (
    <>
      <RecipeSkeleton />
      <RecipeSkeleton />
      <RecipeSkeleton />
    </>
  )
  if (error) return <ListLoadingError error={error.data?.detail} />

  return (
    <div className={styles.container}>
      <div
        className={cn(styles.wrapper, {
          ['tile']: view !== 'feed',
        })}
      >
        {isLoading
          ? ListSkeleton
          : recipies?.length
            ? recipies?.map((recipe) => (
                <Fragment key={recipe.id}>
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onPreview={toggleIngredients}
                  />
                </Fragment>
              ))
            : !isFetching && <EmptyRecipeList />}

        <div ref={loaderRef}>
          {!isLoading && isFetching && <ListLoader />}&nbsp;
        </div>
      </div>
    </div>
  )
}

export default RecipeList
