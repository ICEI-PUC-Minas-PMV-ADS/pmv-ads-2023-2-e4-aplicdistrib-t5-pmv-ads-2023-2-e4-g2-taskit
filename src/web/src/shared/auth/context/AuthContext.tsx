'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { sha256 } from "js-sha256";

export const AuthContext = createContext({
  session: {} as SessionState,
  Login: async (email: string, password: string) => {},
  Logout: async (sessionId: string, userId: string) => {},
  Register: async (name: string, email: string, password: string) => {},
});

export const useAuth = () => useContext(AuthContext);

export interface SessionState {
  status: 'pending' | 'authenticated' | 'unauthenticated';
  error?: string;
  token?: string;
}

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string>('');
  const [session, setSession] = useState<SessionState>({
    status: 'pending',
  });
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const oldToken = localStorage.getItem('@taskit:token');
      if (oldToken) {
        setToken(oldToken);
        setSession({ status: 'authenticated', token: oldToken });
      } else {
        setSession({ status: 'unauthenticated' });
      }
    }
  }, []);

  async function Login(email: string, password: string) {
    await fetch('/api/v1/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password: sha256.hmac(email.toLowerCase(), password),
      })
    }).then((res) => res.json()).then((data) => {
      setToken(data.token);
      localStorage.setItem('@taskit:token', data.token);
      setSession({ status: 'authenticated', token: data.token });
    }).catch(() => {
      setSession({ status: 'unauthenticated', error: 'error' });
    });
  }

  async function Logout(sessionId: string, userId: string) {
    await fetch('/api/v1/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        sessionId,
        userId,
      })
    }).then((res) => res.json()).then(() => {
      setSession({ status: 'unauthenticated' });
      localStorage.removeItem('@taskit:token');
      setToken('');
    });
  }

  async function Register(name: string, email: string, password: string) {
    await fetch('/api/v1/users', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password: sha256.hmac(email.toLowerCase(), password),
      })
    }).then((res) => res.json()).then(async () => {
      await Login(email, password);      
    }).catch(() => {
      setSession({ status: 'unauthenticated', error: 'error' });
    });
  }

  return (
    <AuthContext.Provider value={{ session, Login, Logout, Register }}>
      {children}
    </AuthContext.Provider>
  );
};
