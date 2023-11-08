import { Metadata } from 'next';
import { Inter } from 'next/font/google'
import StyleLayout from './style.layout';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TaskIt',
  description: 'Não perca nenhuma tarefa!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt_BR">
      <body className={inter.className}>
        <StyleLayout>
          <header>
            <Image
              src="/logo.svg"
              width={120}
              height={64}
              alt="TaskIt" />
          </header>
          {children}
        </StyleLayout>
      </body>
    </html>
  )
}
