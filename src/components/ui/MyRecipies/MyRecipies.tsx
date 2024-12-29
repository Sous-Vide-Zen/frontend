'use client'

import { FC } from 'react'

import styles from './MyRecipies.module.scss'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  setDateSortMyRecipes,
  setSortMyRecipesMode,
} from '@/store/features/user/user.slice'
import { setMyRecipiesCount } from '@/store/features/counters/counters.slice'
import { useRecipes } from '@/hooks/useRecipes'
import { RecipeList } from '@/components/ui/RecipeList'
import { Button, DatePicker } from '@/components/ui'
import CustomDatePicker from '../CustomDatePicker';

type MyRecipiesProps = {
  username?: string
}

const MyRecipies: FC<MyRecipiesProps> = ({ username }) => {
  //todo: еще не реализовано в запросе на бэке
  const { myRecipesSort, myRecipesFromDate } = useAppSelector(
    (state) => state.userSettings,
  )
  const dispatch = useAppDispatch()
  const ordering = myRecipesSort === 'ingredients' ? undefined : undefined //todo: после реализации изменить
  const dispatcher = useRecipes('feed', { username, ordering })

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.buttons}>
          <Button
            color="secondary"
            size="big"
            className={myRecipesSort === 'date' ? styles.active : ''}
            onClick={() => dispatch(setSortMyRecipesMode('date'))}
          >
            По дате
          </Button>
          <Button
            color="secondary"
            size="big"
            className={myRecipesSort === 'ingredients' ? styles.active : ''}
            onClick={() => dispatch(setSortMyRecipesMode('ingredients'))}
          >
            По ингредиентам
          </Button>
        </div>

        {myRecipesSort === 'date' && (
          <CustomDatePicker />
        )}
      </div>

      {username && (
        <RecipeList
          dispatcher={dispatcher}
          view="feed"
          removeItemsOnRemoveFromFavorites={false}
          onChangeTotal={(value) => dispatch(setMyRecipiesCount(value))}
        />
      )}
    </div>
  )
}

export default MyRecipies
