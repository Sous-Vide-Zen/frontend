import { Dispatch, FC, SetStateAction } from 'react'

import styles from './loginOrRegisterModal.module.scss'
import { Modal } from '@/components/ui/Modal'
import { LinkLikeButton } from '../LinkLikeButton'

type Props = {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export const ModalTransitionInDraft: FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
}) => (
  <Modal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    customWidth={'869px'}
    customHeight={'233px'}
  >
    <div className={`${styles.modalContent} ${styles.modalDraft}`}>
      <p className={styles.modalFullText}>
        У вас уже есть начатые рецепты. Хотите перейти к ним?
      </p>
      <div className={styles.btns}>
        <div className={styles.btnGoToDrafts}>
          <LinkLikeButton color="primary" size="big" href="/profile">
            Перейти к черновикам
          </LinkLikeButton>
        </div>
        <div>
          <LinkLikeButton color="secondary" size="big" href="/recipe/new">
            Создать новый рецепт
          </LinkLikeButton>
        </div>
      </div>
      <div />
    </div>
  </Modal>
)
