'use client'

import { FC, useState } from 'react'
import Link from 'next/link'
import styles from './PopupEditingMenu.module.scss'

type PopupEditingMenuProps = {
  onEdit?: () => void
  onDelete?: () => void
}

export const PopupEditingMenu: FC<PopupEditingMenuProps> = ({
  onEdit,
  onDelete,
}) => {
  const [active, setActive] = useState(false)

  const toggleActive = () => {
    setActive((prevValue) => !prevValue)
  }

  return (
    <div className={styles.containerButton}>
      {active && (
        <div className={styles.linkEditingMenu}>
          <Link href="#" onClick={onEdit}>
            Редактировать
          </Link>
          <Link href="#" onClick={onDelete}>
            Удалить
          </Link>
        </div>
      )}
      <div className={styles.dropdownIcon} onClick={toggleActive}>
        ⋮
      </div>
    </div>
  )
}
