import Layout from '@/components/layout/layout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout sidebar={false} isSearch={false}>
      {children}
    </Layout>
  )
}
