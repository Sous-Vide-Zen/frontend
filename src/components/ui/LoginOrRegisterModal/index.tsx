import { Dispatch, FC, SetStateAction } from 'react'

import styles from './loginOrRegisterModal.module.scss'
import { Modal } from '@/components/ui/Modal'
import { LinkLikeButton } from '../LinkLikeButton'

type Props = {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export const LoginOrRegisterModal: FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
}) => (
  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
    <div className={styles.modalContent}>
      <p style={{ fontSize: '16px', lineHeight: '99%' }}>
        Войдите или зарегистрируйтесь, чтобы создавать собственные рецепты и
        оценивать рецепты других пользователей.
      </p>
      <div className={styles.btns}>
        <div className={styles.login}>
          <LinkLikeButton color="primary" size="big" href="/login">
            Вход
          </LinkLikeButton>
        </div>
        <div className={styles.registration}>
          <LinkLikeButton color="secondary" size="big" href="/registration">
            Регистрация
          </LinkLikeButton>
        </div>
      </div>
    </div>
    <div />
  </Modal>
)
