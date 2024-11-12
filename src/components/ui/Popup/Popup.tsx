import styles from './Popup.module.scss'
import { CSSProperties, FC, useState } from 'react'

interface IPopupProps {
  Content: FC
  Tooltip: FC
  constentStyles?: CSSProperties
  tooltipStyles?: CSSProperties
}

export const Popup: FC<IPopupProps> = ({
  Content,
  Tooltip,
  constentStyles,
  tooltipStyles,
}) => {
  const [tooltipIsVisible, setTooltipIsVisible] = useState(false)

  const onMouseOver = () => {
    setTooltipIsVisible(true)
  }

  return (
    <div className={styles.wrapper} style={constentStyles}>
      <div onMouseOver={onMouseOver}>
        <Content />
      </div>

      {tooltipIsVisible && (
        <div className={styles.tooltip} style={tooltipStyles}>
          <Tooltip />
        </div>
      )}
    </div>
  )
}

export default Popup
