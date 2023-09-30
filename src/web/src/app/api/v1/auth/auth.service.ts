import { db } from "@/shared/database/db.connection";
import { Session } from "@prisma/client";


async function Create(session: Session | any) {
  if (session.id) {
    return await db.session.update({
      where: { id: session.id, userId: session.userId },
      data: {
        sessionToken: session.sessionToken,
        userId: session.userId,
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

export const AuthService = {
  Create,
  Get,
}
