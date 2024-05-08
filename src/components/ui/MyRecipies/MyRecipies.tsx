'use client'

import { FC, FormEvent, useState } from 'react'
import styles from './MyRecipies.module.scss'
import RecipeList from '@/components/ui/RecipeList/RecipeList'
import { getUseMyRecipies } from '@/hooks/useMyRecipies'
import Button from '../Button/Button'

type MyRecipiesProps = {
  username?: string
}

const MyRecipies: FC<MyRecipiesProps> = ({ username }) => {
  const [date, setDate] = useState<string>('')

  const handleSelectSortByDate = () => {
    console.log('handleSelectSortByDate')
  }

  const handleSelectSortByComponents = () => {
    console.log('handleSelectSortByComponents')
  }

  //todo: После утверждения дизайна переделать на DatePicker
  const handleDateChange = (event: FormEvent<HTMLInputElement>) => {
    console.log('handleDateChange', event.currentTarget.value)
    setDate(event.currentTarget.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.buttons}>
          <Button onClick={handleSelectSortByDate}>По дате</Button>
          <Button onClick={handleSelectSortByComponents}>
            По ингридиентам
          </Button>
        </div>

        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          title="calendar"
        />
      </div>

      {username && (
        <RecipeList dispatcher={getUseMyRecipies(username)} view="feed" />
      )}
    </div>
  )
}

export default MyRecipies
