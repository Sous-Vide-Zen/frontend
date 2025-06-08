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
      <Button
        className={styles.addPreviewButton}
        color="primary"
        size="medium"
        style={{
          borderRadius: '12px',
          lineHeight: '7px',
          padding: '16px 8px',
        }}
      >
        Добавить фото для превью +
      </Button>
    </div>
  )
}
