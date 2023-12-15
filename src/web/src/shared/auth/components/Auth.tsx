'use client';

import { useAuth } from "../context/AuthContext"
import { PublicPage } from "./Public/PublicPage";

export function Auth({ children }: { children: React.ReactNode }) {
  const { session } = useAuth()

  if (session.status === 'pending') {
    return <h1>Loading...</h1>
  }

  if (session.status === 'unauthenticated') {
    return <PublicPage />    
  }

  if (session.status === 'authenticated') {
    return <>{children}</>
  }
}
