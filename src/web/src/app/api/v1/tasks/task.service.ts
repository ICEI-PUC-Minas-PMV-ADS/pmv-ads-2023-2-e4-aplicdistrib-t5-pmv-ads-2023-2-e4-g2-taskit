import { db } from "@/shared/api/database/db.connection";

async function Create(task: any) {
  const { id, ownerId, title, content, createdAt, updatedAt } = await db.task.create({
    data: {
      title: task.title,
      content: task.content,
      ownerId: task.ownerId,
      statusId: task.statusId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })

  return { id, ownerId, title, content, createdAt, updatedAt };
}

async function List(userId: string, quantity = 10, page = 1) {
  const tasks = await db.task.findMany({
    where: {
      ownerId: userId, OR: [{
        canEdit: {
          has: userId
        }, OR: [{
          canView: {
            has: userId
          }
        }]
      }]
    },
    select: {
      id: true,
      title: true,
      statusId: true,
      content: true,
      subtasks: true,
      createdAt: true,
      updatedAt: true,
      workedAt: true,
      timeSpent: true,
      canEdit: true,
      canView: true,
      ownerId: true,
      owner: {
        select: {
          id: true,
          avatar: true,
          name: true,
        }
      }
    },
    take: quantity,
    skip: quantity * page,
  });

  return tasks;
}

async function Get(id: string, userId: string) {
  return await db.task.findUnique({
    where: {
      id, AND: [{
        ownerId: userId,
        OR: [{
          canEdit: {
            has: userId
          }, OR: [{
            canView: {
              has: userId
            }
          }]
        }]
      }]
    },
    select: {
      id: true,
      title: true,
      statusId: true,
      content: true,
      subtasks: true,
      createdAt: true,
      updatedAt: true,
      workedAt: true,
      timeSpent: true,
      canEdit: true,
      canView: true,
      ownerId: true,
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
      id, ownerId: userId
    },
    select: {
      id: true,
      title: true,
      statusId: true,
      content: true,
      subtasks: true,
      workedAt: true,
      updatedAt: true,
      timeSpent: true,
    },
    data: {
      title: task.title,
      statusId: task.statusId,
      content: task.content,
      workedAt: task.startedAt,
      timeSpent: task.timeSpent,
      subtasks: {
        upsert: task.subtasks?.map((subtask: any) => ({
          where: { id: subtask.id },
          update: {
            title: subtask.title,
            statusId: subtask.statusId,
            content: subtask.content,
            workedAt: subtask.startedAt,
            timeSpent: subtask.timeSpent,
          },
          create: {
            title: subtask.title,
            statusId: subtask.statusId,
            content: subtask.content,
            workedAt: subtask.startedAt,
            timeSpent: subtask.timeSpent,
          }
        }))
      },
    }
  })

  return updatedTask;
}

async function AddToShareEdit(id: string, ownerId: string, userId: string) {
  const { canEdit, canView } = await db.task.findFirstOrThrow({
    where: { id, ownerId },
    select: {
      canEdit: true,
      canView: true,
    }
  });

  const editList = canEdit.map((user: any) => user.id !== userId && user.id);
  editList.push(userId);

  const viewList = canView.map((user: any) => user.id !== userId && user.id);

  return await db.task.update({
    where: { id, ownerId },
    data: {
      canEdit: {
        set: editList,
      },
      canView: {
        set: viewList,
      }
    }
  })
}

async function RemoveFromShareEdit(id: string, ownerId: string, userId: string) {
  const { canEdit } = await db.task.findFirstOrThrow({
    where: { id, ownerId, AND: [{ canEdit: { has: userId } }] },
    select: {
      canEdit: true,
    }
  });

  const listWithoutUser = canEdit.map((user: any) => user.id !== userId && user.id);

  return await db.task.update({
    where: { id, ownerId },
    data: {
      canEdit: {
        set: listWithoutUser
      }
    }
  })
}

async function AddToShareView(id: string, ownerId: string, userId: string) {
  const { canView, canEdit } = await db.task.findFirstOrThrow({
    where: { id, ownerId },
    select: {
      canView: true,
      canEdit: true,
    }
  });

  const viewList = canView.map((user: any) => user.id !== userId && user.id);
  viewList.push(userId);

  const editList = canEdit.map((user: any) => user.id !== userId && user.id);

  return await db.task.update({
    where: { id, ownerId },
    data: {
      canView: {
        set: viewList
      },
      canEdit: {
        set: editList
      }
    }
  })
}

async function RemoveFromShareView(id: string, ownerId: string, userId: string) {
  const { canView } = await db.task.findFirstOrThrow({
    where: { id, ownerId, AND: [{ canView: { has: userId } }] },
    select: {
      canView: true,
    }
  });

  const listWithoutUser = canView.map((user: any) => user.id !== userId && user.id);

  return await db.task.update({
    where: { id, ownerId },
    data: {
      canView: {
        set: listWithoutUser
      }
    }
  })
}

async function Delete(id: string, ownerId: string) {
  return await db.task.delete({
    where: { id, ownerId },
  })
}

export const TaskService = {
  Create,
  Update,
  Delete,
  List,
  Get,
  AddToShareEdit,
  AddToShareView,
  RemoveFromShareEdit,
  RemoveFromShareView
}
