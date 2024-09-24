import { ReactElement } from 'react'
import styles from '../forms.module.scss'

interface FieldSetProps {
  label?: string
  children: ReactElement | ReactElement[]
}
export const FieldSet = ({ label, children }: FieldSetProps) => {
  return (
    <fieldset className={styles.fieldset}>
      {label && <legend>{label}</legend>}
      <div className={styles.fields}>{children}</div>
    </fieldset>
  )
}
