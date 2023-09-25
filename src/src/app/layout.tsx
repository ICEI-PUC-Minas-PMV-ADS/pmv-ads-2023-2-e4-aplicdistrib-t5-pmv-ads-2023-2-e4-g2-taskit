export const metadata = {
  title: 'TaskIt',
  description: 'Não perca nenhuma tarefa!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
