'use client'

import styles from './setting.module.scss'
import Modal from '@/components/ui/Modal/Modal'
import Button from '@/components/ui/Button/Button'
import { useState } from 'react'

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Button onClick={() => setIsOpen(true)}>Тест</Button>
      </div>
      <div className={styles.rightbar} />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Title</h2>
        <p>Modal content goes here...</p>
      </Modal>
    </div>
  )
}
