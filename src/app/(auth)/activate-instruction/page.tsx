'use client'

import styles from './activate-instruction.module.scss'
import ActivateInstructionForm from '@/components/forms/auth/ActivateInstructionForm'

export default function Activate() {
  return (
    <div className={styles.container}>
      <ActivateInstructionForm />
    </div>
  )
}
