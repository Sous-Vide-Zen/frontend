'use client'

import Layout from '@/components/layout/layout'
import NotFound from '@/components/ui/NotFound/NotFound'

export default function NotFoundPage() {
  return (
    <Layout sidebar={false} isSearch={true}>
      <NotFound />
    </Layout>
  )
}
