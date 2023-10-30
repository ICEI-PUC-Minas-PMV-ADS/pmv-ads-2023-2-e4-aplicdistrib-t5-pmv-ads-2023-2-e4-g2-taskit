import { Inter } from 'next/font/google'
import StyleLayout from './style.layout';

const inter = Inter({ subsets: ['latin'] })

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
    <html>
      <body className={inter.className}>
        <StyleLayout>
          {children}
        </StyleLayout>
      </body>
    </html>
  )
}
