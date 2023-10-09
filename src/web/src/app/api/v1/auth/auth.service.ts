import { db } from "@/shared/api/database/db.connection";
import { Session } from "@prisma/client";

async function Create({ userId, sessionToken, agent, os = 'unknown', expires }: Session | any) {
  return await db.session.findFirstOrThrow({
    where: { userId, agent, os },
  }).then(async ({ id }) => {
    return await db.session.update({
      where: { id },
      data: {
        sessionToken,
        expires
      },
      select: {
        id: true,
        sessionToken: true,
        expires: true,
      }
    })
  }).catch(async () => {
    return await db.session.create({
      data: {
        userId,
        sessionToken,
        agent,
        os,
        expires
      },
    })
  });
}

async function Get(sessionToken: string, userId: string) {
  return await db.session.findUnique({
    where: { sessionToken, userId },
    select: {
      expires: true,
    },
  })
}

async function Invalidate(id: string, userId: string) {
  return await db.session.update({
    where: { id, userId },
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
