'use client'
import { FC, ReactNode } from 'react'

import styles from './layout.module.scss'
import Header from '@/components/layout/header/header'
import Sidebar from '@/components/layout/sidebar/sidebar'
import ButtonBack from '@/components/ui/ButtonBack/ButtonBack'

type Props = {
  children: ReactNode
  sidebar?: boolean
  isSearch?: boolean
  backButton?: boolean
}

const Layout: FC<Props> = ({
  children,
  sidebar = true,
  isSearch = false,
  backButton: showBackButton = false,
}) => (
  <div className={styles.layout}>
    <div className={styles.container} style={{ flexDirection: 'column' }}>
      <Header isSearch={isSearch} />
      {sidebar ? (
        <div className={styles.layoutTwo}>
          <Sidebar />
          {children}
        </div>
      ) : (
        <div className={styles.layoutOne}>
          {showBackButton && (
            <div className={styles.left}>
              <ButtonBack />
            </div>
          )}
          <div className={styles.center}>{children}</div>
        </div>
      )}
    </div>
  </div>
)

export default Layout
