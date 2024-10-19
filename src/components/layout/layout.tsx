'use client'
import { FC, ReactNode } from 'react'
import Header from '@/components/layout/header/header'
import Sidebar from '@/components/layout/sidebar/sidebar'
import styles from './layout.module.scss'

type Props = {
  children: ReactNode
  sidebar?: boolean
  isSearch?: boolean
}

const Layout: FC<Props> = ({ children, sidebar = true, isSearch = false }) => (
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
          <div className={styles.center}>{children}</div>
        </div>
      )}
    </div>
  </div>
)

export default Layout
