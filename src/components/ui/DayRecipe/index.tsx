import { FC } from 'react'
import styles from './DayRecipe.module.scss'

type Props = {
  img?: string
  username?: string
}

const DayRecipe: FC<Props> = () => {
  return (
    <div className={styles.topRecipe}>
      <h2>Рецепт дня</h2>
      <div className={styles.container}>
        <div className={styles.zaglushka}>Фото отсутствует</div>
        <span>Тыква с мёдом, чесноком, горчицей и лавровыми листами</span>
      </div>
    </div>
  )
}

export default DayRecipe
