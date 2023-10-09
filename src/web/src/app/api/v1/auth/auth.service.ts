import { db } from "@/shared/api/database/db.connection";
import { Session } from "@prisma/client";

async function Create(session: Session | any) {
  if (session.id) {
    return await db.session.update({
      where: { id: session.id, userId: session.userId },
      data: {
        userId: session.userId,
        sessionToken: session.sessionToken,
        expires: session.expires
      }
    })  
  } else {
    return await db.session.create({
      data: {
        sessionToken: session.sessionToken,
        userId: session.userId,
        expires: session.expires
      }
    })  
  }
}

async function Get(sessionToken: string, userId: string) {
  return await db.session.findUnique({
    where: { sessionToken, userId },
    select: {
      expires: true,
    },
  })
}

async function Invalidate(sessionId: string, userId: string) {
  return await db.session.update({
    where: { id: sessionId, userId },
    data: {
      sessionToken: '',
      expires: ''
    },
    select: {
      id: true,
      sessionToken: true,
      expires: true,
    }
  })
}

async function Login(email: string, password: string) {
  return await db.user.findFirst({
    where: {
      email,
      password,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  })
}

export const AuthService = {
  Invalidate,
  Create,
  Get,
  Login
}
