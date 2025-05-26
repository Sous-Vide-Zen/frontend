'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

import styles from './authForms.module.scss'
import { LinkLikeButton } from '@/components/ui'
import AboutMeForm from '../users/AboutMeForm'

export default function UserDataSaveSuccessfullForm() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const modalRef = useRef<HTMLDivElement>(null)

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      // Устанавливаем задержку перед закрытием
      setTimeout(handleCloseModal, 200)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  return (
    <>
      {isOpen && (
        <div className={styles.wrapper}>
          <div className={styles.modal} ref={modalRef}>
            <button
              className={styles.closeButton}
              onClick={handleCloseModal}
              aria-label="Закрыть модальное окно"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L21 21M21 1L1 21"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className={styles.claritySuccessIcon}>
              <Image
                src="/img/check/clarity_success-standard-solid.svg"
                alt="check"
                width={80}
                height={80}
                draggable={false}
                priority
              />
            </div>

            <div className={styles.modalContent}>
              <div className={styles.inner_text}>
                <h2>Ваши данные сохранены!</h2>
                <p>Новые данные будут отражены на вашей странице.</p>
              </div>
              <p className={styles.modalContentButton}>
                <LinkLikeButton href="/" size="big" color="primary">
                  На главную
                </LinkLikeButton>
              </p>
            </div>
          </div>
        </div>
      )}
      <AboutMeForm />
    </>
  )
}
