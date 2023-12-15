import { Metadata } from 'next';
import { Inter } from 'next/font/google'
import { AuthProvider } from "@/shared/auth/context/AuthContext";

import StyleLayout from './style.layout';
import { Auth } from '@/shared/auth/components/Auth';

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
          <AuthProvider>
            <Auth>
              {children}
            </Auth>
          </AuthProvider>
        </StyleLayout>
      </body>
    </html>
  )
}
