import { db } from "@/shared/database/db.connection";
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

async function Get(sessionToken: string, userId: number) {
  return await db.session.findUnique({
    where: { sessionToken, userId },
    select: {
      expires: true,
    },
  })
}

async function Invalidate(sessionId: number, userId: number) {
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

export const AuthService = {
  Invalidate,
  Create,
  Get,
}
