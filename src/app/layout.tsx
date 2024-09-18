import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import './common.css'
import { Providers } from '@/store/features/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sous vide Zen',
  description:
    'Sous-Vide Zen is a website for sharing and discovering recipes for sous-vide cooking, a technique that involves cooking food in vacuum-sealed bags at precise temperatures. Users can create their own recipes, browse popular and featured recipes, follow other users, react and comment on recipes, and save their favorites.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div style={{ padding: '20px' }}>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
