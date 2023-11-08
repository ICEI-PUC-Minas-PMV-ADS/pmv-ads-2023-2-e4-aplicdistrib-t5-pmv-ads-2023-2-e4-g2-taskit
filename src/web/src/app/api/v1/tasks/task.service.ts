import { db } from "@/shared/api/database/db.connection";

async function Create(task: any) {
  const { id, ownerId, title, content, createdAt, updatedAt } = await db.task.create({
    data: {
      title: task.title,
      content: task.content,
      ownerId: task.ownerId,
      status: task.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })

  return { id, ownerId, title, content, createdAt, updatedAt };
}

async function List(userId: string, quantity = 10, page = 1) {
  const tasks = await db.task.findMany({
    where: {
      ownerId: userId
    },
    include: {
      allowance: {
        select: {
          userId: true,
          permission: true,
        }
      },
      owner: {
        select: {
          id: true,
          avatar: true,
          name: true,
        }
      }
    },
    take: quantity,
    skip: quantity * (page - 1),
  });

  return tasks;
}

async function Get(id: string, userId: string) {
  return await db.task.findUniqueOrThrow({
    where: {
      id,
      OR: [
        { ownerId: { equals: userId } },
        {
          allowance: {
            some: {
              userId: userId
            }
          }
        }]
    },
    select: {
      id: true,
      title: true,
      status: true,
      content: true,
      subtasks: true,
      createdAt: true,
      updatedAt: true,
      workedAt: true,
      timeSpent: true,
      ownerId: true,
      allowance: {
        select: {
          userId: true,
          permission: true,
        }
      },
      owner: {
        select: {
          id: true,
          avatar: true,
          name: true,
        }
      }
    },
  })
}

async function Update(id: string, task: any, userId: string) {
  const updatedTask = await db.task.update({
    where: {
      id,
      OR: [
        { ownerId: { equals: userId } },
        {
          allowance: {
            some: {
              userId: userId,
              AND: {
                permission: 'edit'
              }
            }
          }
        }]
    },
    select: {
      id: true,
      title: true,
      status: true,
      content: true,
      allowance: {
        select: {
          userId: true,
          permission: true,
        }
      },
      subtasks: true,
      workedAt: true,
      updatedAt: true,
      timeSpent: true,
    },
    data: {
      title: task.title,
      status: task.status,
      content: task.content,
      workedAt: task.startedAt,
      timeSpent: task.timeSpent,
      subtasks: task.subtasks,
    }
  })
  return updatedTask;
}

async function Delete(id: string, ownerId: string) {
  return await db.task.delete({
    where: { id, ownerId },
  })
}

async function VerifyOwner(id: string, userId: string) {
  return await db.task.findUnique({
    where: { id, ownerId: userId },
    select: { id: true }
  })
}

async function Share(id: string, userId: string, permission: 'edit' | 'view') {
  return await db.sharedTask.update({
    where: { taskId: id, userId },
    data: {
      permission,
    },
    select: {
      taskId: true,
      permission: true,
      userId: true,
    }
  }).catch(async () => {
    return await db.sharedTask.create({
      select: {
        taskId: true,
        permission: true,
        userId: true,
      },
      data: {
        taskId: id,
        permission,
        userId,
      },
    })
  });
}

async function Unshare(id: string, userId: string) {
  return await db.sharedTask.delete({
    where: { taskId: id, userId },
  });
}

export const TaskService = {
  Create,
  Update,
  Delete,
  List,
  Get,
  Share,
  Unshare,
  VerifyOwner
}
