'use client'

import { FC } from 'react'

import styles from './MyRecipies.module.scss'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  setDateSortMyRecipes,
  setSortMyRecipesMode,
} from '@/store/features/user/user.slice'
import { useRecipes } from '@/hooks/useRecipes'
import RecipeList from '@/components/ui/RecipeList/RecipeList'
import Button from '@/components/ui/Button/Button'
import DatePicker from '@/components/ui/DatePicker/DatePicker'

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
          <DatePicker
            placeholder="Выберите нужную дату"
            value={
              (myRecipesFromDate && new Date(myRecipesFromDate)) || undefined
            }
            onChange={(date) =>
              dispatch(setDateSortMyRecipes(date?.toISOString().split('T')[0]))
            }
          />
        )}
      </div>

      {username && <RecipeList dispatcher={dispatcher} view="feed" />}
    </div>
  )
}

export default MyRecipies
