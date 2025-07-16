'use client'

import { FC, useState } from 'react'
import Link from 'next/link'
import styles from './ComntextsMenu.module.scss'

type ComntextsMenuProps = {
  onDelete?: () => void
}

export const ComntextsMenu: FC<ComntextsMenuProps> = ({ onDelete }) => {
  const [active, setActive] = useState(false)

  const toggleActive = () => {
    setActive((prevValue) => !prevValue)
  }

  return (
    <div className={styles.comntextsMenucontainerButton}>
      {active && (
        <div className={styles.recipeDeletionLink}>
          {/* <Link href="#" onClick={onDelete}>
            Удалить рецепт
          </Link> */}
        </div>
      )}
      <div className={styles.dropdownIcon} onClick={toggleActive}>
        ⋮
      </div>
    </div>
  )
}
