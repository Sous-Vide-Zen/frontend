import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { useRouter } from 'next/navigation'
import styles from './loginOrRegisterModal.module.scss'
import { Modal } from '@/components/ui/Modal'

type Props = {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export const ModalPublish: FC<Props> = ({ isModalOpen, setIsModalOpen }) => {
  const router = useRouter()
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const openRecipeLastPublish = useCallback(() => {
    setIsModalOpen(false)
    router.push('/')
  }, [setIsModalOpen, router])

  useEffect(() => {
    if (isModalOpen) {
      timerRef.current = setTimeout(() => {
        openRecipeLastPublish()
      }, 3000)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isModalOpen, openRecipeLastPublish])

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      showCloseButton={false}
    >
      <div className={`${styles.modalContent} ${styles.modalOnlyDraft}`}>
        <p className={styles.modalFullText}>Ваш рецепт успешно опубликован!</p>
      </div>
      <button
        className={styles.modalOnlyDraftCloseButton}
        onClick={openRecipeLastPublish}
        aria-label="Close modal"
      >
        <svg
          width="21"
          height="22"
          viewBox="0 0 21 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L20 21M20 1L1 21"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </Modal>
  )
}
