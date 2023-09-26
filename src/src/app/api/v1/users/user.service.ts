import { db } from "@/shared/database/db.connection";

async function Create(user: any) {
  return await db.user.create({
    data: {
      name: user.name,
      email: user.email,
      tasks: user.tasks,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })  
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

async function Get(id: number) {
  return await db.user.findUnique({
    where: { id },
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

async function Update(user: any) {
  return await db.user.update({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      tasks: true,
      createdAt: true,
      updatedAt: true,
    },
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
      tasks: user.tasks,
      updatedAt: new Date(),
    }
  })
}

async function Delete(id: number) {
  return await db.user.delete({
    where: { id },
  })
}

async function Validate(id: number, email: string, password: string) {
  return await db.user.findFirst({
    where: { id, email, password },
    select: {
      id: true,
      name: true,
      email: true,
      updatedAt: true,
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
      tasks: true,
      createdAt: true,
      updatedAt: true,
    },
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
  Validate,
  Login
}
