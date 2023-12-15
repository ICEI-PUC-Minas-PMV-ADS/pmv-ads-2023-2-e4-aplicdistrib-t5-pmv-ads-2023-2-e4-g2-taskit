'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { sha256 } from "js-sha256";
import { decode } from 'jsonwebtoken';

export const AuthContext = createContext({
  session: {} as SessionState,
  sessionId: '',
  userData: {} as any,
  error: '',
  Login: async (email: string, password: string) => { },
  Logout: async (sessionId: string, userId: string) => { },
  Register: async (name: string, email: string, password: string) => { },
});

export const useAuth = () => useContext(AuthContext);

export interface SessionState {
  status: 'pending' | 'authenticated' | 'unauthenticated';
  error?: string;
  token?: string;
}

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [sessionId, setSessionId] = useState<string>('');
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
    await fetch('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password: sha256.hmac(email.toLowerCase(), password),
      })
    }).then((res) => res.json()).then((data) => {
      if (data.token) {
        setToken(data.token);
        setSessionId(data.id);
        localStorage.setItem('@taskit:token', data.token);
        setSession({ status: 'authenticated', token: data.token });
      }
      if (data.message) {
        setError(data.message);
      }
    }).catch(() => {
      setSession({ status: 'unauthenticated', error: 'error' });
    });
  }

  const userData = decode(localStorage.getItem('@taskit:token') || '');

  async function Logout(sessionId: string, userId: string) {
    await fetch('/api/v1/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        sessionId,
        userId,
      })
    }).then((res) => res.json()).finally(() => {
      setSession({ status: 'unauthenticated' });
      localStorage.removeItem('@taskit:token');
      setSessionId('');
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
    }).then((res) => res.json()).then(async (data) => {
      if (data.message) {
        setError(data.message);
      } else {
        await Login(email, password);
      }
    }).catch(() => {
      setSession({ status: 'unauthenticated', error: 'error' });
    });
  }

  return (
    <AuthContext.Provider value={{ session, sessionId, error, userData, Login, Logout, Register }}>
      {children}
    </AuthContext.Provider>
  );
};
