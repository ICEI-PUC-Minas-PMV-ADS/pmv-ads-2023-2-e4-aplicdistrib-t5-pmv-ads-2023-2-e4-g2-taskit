import { db } from "@/shared/database/db.connection";
import { Task } from "@prisma/client";

async function Create(task: any) {
  const { id, ownerId, title, content, createdAt, updatedAt } = await db.task.create({
    data: {
      title: task.title,
      content: task.content,
      ownerId: task.ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })

  return { id, ownerId, title, content, createdAt, updatedAt };
}

async function List(ownerId: number) {
  return await db.task.findMany({
    where: { ownerId },
    select: {
      id: true,
      title: true,
      content: true,
      subtasks: true,
      createdAt: true,
      updatedAt: true,
      finishedAt: true,
    },
  })
}

async function Get(id: number) {
  return await db.task.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      ownerId: true,
      subtasks: true,
      createdAt: true,
      updatedAt: true,
      finishedAt: true,
    },
  })
}

async function Update(task: Task) {
  return await db.task.update({
    where: { id: task.id },
    select: {
      id: true,
      title: true,
      content: true,
      subtasks: true,
      updatedAt: true,
      finishedAt: true,
    },
    data: {
      title: task.title,
      content: task.content,      
      ownerId: task.ownerId,
      updatedAt: new Date(),
      finishedAt: task.finishedAt,
    }
  })
}

async function Delete(id: number, ownerId: number) {
  return await db.task.delete({
    where: { id, ownerId },
  })
}

export const TaskService = {
  Create,
  Update,
  Delete,
  List,
  Get
}
