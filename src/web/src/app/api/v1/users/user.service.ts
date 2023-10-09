import { db } from "@/shared/api/database/db.connection";

async function Create(user: any) {
  const { id, name, email, createdAt, updatedAt } = await db.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
      tasks: user.tasks,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })

  return { id, name, email, createdAt, updatedAt };
}

async function List() {
  return await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      tasks: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

async function Get(id: string) {
  return await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      avatar: true,
      email: true,
      tasks: {
        select: {
          _count: true,
        }
      },
      sessions: {
        select: {
          id: true,
          expires: true,
        }
      },
      createdAt: true,
      updatedAt: true,
    },
  })
}

async function Update(user: any) {
  return await db.user.upsert({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      avatar: true,
      email: true,
      tasks: true,
      createdAt: true,
      updatedAt: true,
    },
    create: {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      password: user.password,
      tasks: user.tasks,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    update: {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      password: user.password,
      tasks: user.tasks,
      updatedAt: new Date(),
    }
  })
}

async function Delete(id: string) {
  return await db.user.delete({
    where: { id },
  })
}

async function Validate(id: string, email: string, password: string) {
  return await db.user.findFirst({
    where: { id, email, password },
    select: {
      id: true,
      email: true,
    }
  })
}

async function GetByEmail(email: string) {
  return await db.user.findFirst({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      tasks: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export const UserService = {
  Create,
  Update,
  Delete,
  List,
  Get,
  GetByEmail,
  Validate
}
