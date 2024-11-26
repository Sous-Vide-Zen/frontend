import { FC } from 'react'

import styles from './RecipeHash.module.scss'
import { RecipeFeed } from '@/store/features/recipes/recipes.types'
import { Button, Popup } from '@/components/ui'

interface RecipeCardProps {
  tag: RecipeFeed['tag']
}

export const RecipeHash: FC<RecipeCardProps> = ({ tag }) => {
  const hashLength =
    tag.length * 2 +
    tag.reduce((len, e) => {
      return len + e.name.length
    }, 0)

  return (
    <div className={styles.hash}>
      <div className={styles.crop}>
        {tag.map((e: { name: string }) => (
          <span key={e.name}>{`#${e.name}`}</span>
        ))}
      </div>
      {hashLength > 90 && (
        <Popup
          tooltipStyles={{
            maxWidth: '350px',
          }}
          Content={() => (
            <Button color="clear" size="small">
              Ещё
            </Button>
          )}
          Tooltip={() => 'todo todo todo'}
        />
      )}
    </div>
  )
}
