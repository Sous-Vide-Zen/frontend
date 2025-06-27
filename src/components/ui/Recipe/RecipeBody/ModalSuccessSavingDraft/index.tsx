import React, { useState, useEffect } from 'react'
import styles from './ModalSuccessSavingDraft.module.scss'
import Image from 'next/image'
import { Modal } from '@/components/ui/Modal/index'

const ModalSuccessSavingDraft = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  useEffect(() => {
    if (isModalOpen) {
      const timerId = setTimeout(() => {
        setIsModalOpen(false)
      }, 3000)

      return () => clearTimeout(timerId)
    }
  }, [isModalOpen])

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      customWidth="391px"
      customHeight="193px"
    >
      <div className={`${styles.modalContent} ${styles.customPadding}`}>
        <div className={styles.modalSuccessContent}>
          <div className={styles.claritySuccessIcon}>
            <Image
              src="/img/check/clarity_success-standard-solid.svg"
              alt="check"
              width={60}
              height={60}
              draggable={false}
              priority
            />
          </div>
          <p className={styles.modalFullText}>Ваш черновик успешно сохранен</p>
        </div>
      </div>
    </Modal>
  )
}

export default ModalSuccessSavingDraft
