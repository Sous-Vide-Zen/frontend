'use client'

import { FC } from 'react'
import Image from 'next/image'

import styles from './newRecipeProto.module.scss'
import { Button } from '@/components/ui/Button'

interface RecipeCardProps {
  url?: string
  setUrl?: (newUrl: string) => void
}

export const NewRecipePhoto: FC<RecipeCardProps> = ({ url, setUrl }) => {
  return (
    <div>
      <Button>Добавить фото для превью</Button>
    </div>
  )
}
