import { Dispatch, FC, SetStateAction } from 'react'

import styles from './loginOrRegisterModal.module.scss'
import { Modal } from '@/components/ui/Modal'
import { LinkLikeButton } from '../LinkLikeButton'

type Props = {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export const ModalOnlyDraft: FC<Props> = ({ isModalOpen, setIsModalOpen }) => (
  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <p>
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
    <div />
  </Modal>
)
