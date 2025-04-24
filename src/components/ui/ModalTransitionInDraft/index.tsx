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
  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <p>У вас уже есть начатые рецепты. Хотите перейти к ним?</p>
    <div className={styles.btns}>
      <div className={styles.login}>
        <LinkLikeButton color="primary" size="big" href="/profile">
          Перейти к черновикам
        </LinkLikeButton>
      </div>
      <div className={styles.registration}>
        <LinkLikeButton color="secondary" size="big" href="/recipe/new">
          Создать новый рецепт
        </LinkLikeButton>
      </div>
    </div>
    <div />
  </Modal>
)
