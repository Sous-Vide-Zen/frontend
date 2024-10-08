'use client'

import styles from './ListViewChanger.module.scss'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setViewMode } from '@/store/features/user/user.slice'
import Button from '@/components/ui/Button/Button'

export default function ListViewChanger() {
  const dispatch = useAppDispatch()
  const { view } = useAppSelector((state) => state.userSettings)

  return (
    <div className={styles.view}>
      <h3>Вид ленты</h3>
      <div>
        <Button
          color="secondary"
          size="medium"
          pressed={view === 'feed'}
          onClick={() => dispatch(setViewMode('feed'))}
        >
          Лента
        </Button>
        <Button
          color="secondary"
          size="medium"
          pressed={view === 'tile'}
          onClick={() => dispatch(setViewMode('tile'))}
        >
          Плитка
        </Button>
      </div>
    </div>
  )
}
