'use client'

import styles from '../mutationRecipe.module.scss'
import { RecipeFull } from '@/store/features/recipes/recipes.types'
import RecipeModify from '@/components/ui/RecipeModify/RecipeModify'
import Rightbar from '@/components/layout/rightbar/rightbar'

const recipeMock: RecipeFull = {
  id: 1,
  title: 'Delicious Recipe',
  slug: 'delicious-recipe',
  author: {
    id: 1,
    username: '',
    display_name: '',
    avatar: '',
  },
  ingredients: [
    {
      name: 'Water',
      unit: 'литр',
      amount: 1,
    },
    {
      name: 'Сахар',
      unit: 'грамм',
      amount: 500,
    },
  ],
  full_text: 'Lorem ipsum dolor sit amet...',
  tag: [
    {
      name: 'ужин',
      slug: 'uzjin',
    },
    {
      name: 'завтрак',
      slug: 'zavtrak',
    },
    {
      name: 'обед',
      slug: 'obed',
    },
  ],
  reactions_count: 3,
  views_count: 1,
  category: [{ id: 1, name: 'category1', slug: 'category1' }],
  cooking_time: 30,
  pub_date: '2022-01-01T00:00:00Z',
  updated_at: '2022-01-01T00:00:00Z',
}

export default function NewRecipePage() {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.wrapper} scroll scroll--left scroll__thin`}
        id="wrapper"
      >
        <RecipeModify /* recipe={recipeMock} */ />
      </div>
      <Rightbar showListViewButtons={false} showSortButtons={false}/>
    </div>
  )
}
