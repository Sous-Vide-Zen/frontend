'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { AppStore, makeStore, persistor } from '.'

// переделано по рекомендации из https://redux-toolkit.js.org/usage/nextjs#introduction
// добавлен PersistGate для сохранения состояния стейта

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
