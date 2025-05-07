import { Dispatch, FC, SetStateAction } from 'react'

import styles from './loginOrRegisterModal.module.scss'
import { Modal } from '@/components/ui/Modal'
import { LinkLikeButton } from '../LinkLikeButton'

type Props = {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export const ModalOnlyDraft: FC<Props> = ({ isModalOpen, setIsModalOpen }) => (
  <Modal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    showCloseButton={false}
  >
    <div className={`${styles.modalContent} ${styles.modalOnlyDraft}`}>
      <p className={styles.modalFullText}>
        У вас не осталось свободных слотов для черновиков. Для создания нового
        черновика удалите или опубликуйте черновики.
      </p>
      <div className={styles.btns}>
        <div className={styles.login}>
          <LinkLikeButton color="primary" size="big" href="/profile">
            Перейти к черновикам
          </LinkLikeButton>
        </div>
      </div>

      <button
        className={styles.modalOnlyDraftCloseButton}
        onClick={() => setIsModalOpen(false)}
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
    </div>
  </Modal>
)
