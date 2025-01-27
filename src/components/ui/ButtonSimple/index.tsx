import styles from './ButtonSimple.module.scss'

type Props = {
  text: string;
  handleClick?: () => void;
}

export const ButtonSimple = ({ text, handleClick}: Props) => {
  return (
    <div className={styles.buttonSimple} onClick={handleClick}>
      {text}
    </div>
  )
}
