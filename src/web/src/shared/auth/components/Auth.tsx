'use client';

import Image from 'next/image';

import { useAuth } from "../context/AuthContext"
import { PublicPage } from "./Public/PublicPage";
import { TopBar } from '@/shared/components/TopBar/TopBar';

import { AuthContainer } from './Auth.style';
import { TaskProvider } from '@/Tasks/context/TaskContext';

export function Auth({ children }: { children: React.ReactNode }) {
  const { session, userData } = useAuth();

  return (
    <AuthContainer>
      {session.status === 'authenticated' && <TopBar />}
      <div>
        <header>
          <Image
            src="/logo.svg"
            width={120}
            height={64}
            alt="TaskIt" />
        </header>

        {session.status === 'unauthenticated' && <PublicPage />}
        
        {session.status === 'authenticated' && <TaskProvider token={userData.token}>{children}</TaskProvider>}
      </div>
    </AuthContainer>
  )
}
