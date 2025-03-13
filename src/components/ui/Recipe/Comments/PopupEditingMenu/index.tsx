'use client'

import { FC, useState } from 'react'
import Link from 'next/link'
import styles from './PopupEditingMenu.module.scss'
import { ComntextsMenu } from '../ComntextsMenu'

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
          <Link
            href="#"
            onClick={(event) => {
              event.preventDefault() // Предотвращаем стандартное поведение ссылки
              if (onEdit) onEdit() // Вызываем функцию редактирования
            }}
          >
            Редактировать
          </Link>
          <Link href="#" onClick={onDelete}>
            Удалить
          </Link>
        </div>
      )}
      <ComntextsMenu></ComntextsMenu>
      <div className={styles.dropdownIcon} onClick={toggleActive}>
        ⋮
      </div>
    </div>
  )
}
