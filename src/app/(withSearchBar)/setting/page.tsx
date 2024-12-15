'use client'

import styles from './setting.module.scss'
import { useState } from 'react'
import Data from './data/data'
import Notifications from './notifications/notifications'
import ButtonDelete from './deletebtn/deletebtn'

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Data />
        <Notifications />
        <ButtonDelete />
      </div>
      <div className={styles.rightbar} />

      {/* <Modal2 isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Title</h2>
        <p>Modal content goes here...</p>
      </Modal2> */}
    </div>
  )
}
