import { NextResponse } from "next/server";
import JWT from 'jsonwebtoken';

import { verifyToken } from "@/shared/api/utils/verifyToken";
import { IRoutePathMethod } from "@/shared/api/interfaces/apidocs.interface";
import { TaskService } from "./task.controller";

export async function POST(req: Request) {
  /** Check Token Validity */
  const token = req.headers?.get('Authorization')?.split('Bearer ')[1]!;
  const tokenUser: any = JWT.decode(token);
  try {
    JWT.verify(token, tokenUser.email);
  } catch (err) {
    return NextResponse.json({ code: 401, message: "Access Denied" }, { status: 401 });
  }
  const url = new URL(req.url);
  const isAuthenticated = await verifyToken(req);
  if (!isAuthenticated) return NextResponse.json({ message: 'Access Denied', code: 401, redirectTo: url.host + '/login' }, { status: 401 });
  /** End of Check Token Validity */

  const task = await req.json();
  if (!task || !task.ownerId) return NextResponse.json({ code: 400, message: "Bad Request" }, { status: 400 });

  const createdTask = await TaskService.Create({ ...task, canEdit: task.canEdit ?? [], canView: task.canView ?? [], subtasks: task.subtasks ?? [] });
  return NextResponse.json(createdTask);
}

interface GetTaskParams {
  params: {
    quantity: number;
    page: number;
  }
}
export async function GET(req: Request, { params }: GetTaskParams) {
  /** Check Token Validity */
  const token = req.headers?.get('Authorization')?.split('Bearer ')[1]!;
  const tokenUser: any = JWT.decode(token);
  try {
    JWT.verify(token, tokenUser.email);
  } catch (err) {
    return NextResponse.json({ code: 401, message: "Access Denied" }, { status: 401 });
  }
  const url = new URL(req.url);
  const isAuthenticated = await verifyToken(req);
  if (!isAuthenticated) return NextResponse.json({ message: 'Access Denied', code: 401, redirectTo: url.host + '/login' }, { status: 401 });
  /** End of Check Token Validity */

  if (!tokenUser.id) return NextResponse.json({ code: 400, message: "Bad Request" }, { status: 400 });
  const quantity = params.quantity ?? 10;
  const page = params.page ?? 1;
  const tasks = await TaskService.List(tokenUser.id, quantity, page);
  if (!tasks || tasks.length === 0) return NextResponse.json({ code: 202, message: "There are no tasks for this user." }, { status: 202 });

  return NextResponse.json(tasks);
}

export const CreateTask: IRoutePathMethod = {
  tags: [
    "Tasks"
  ],
  summary: "Create task",
  description: "Adds a task to database",
  operationId: "CreateTask",
  security: {
    Bearer: []
  },
  produces: [
    "application/json"
  ],
  parameters: [{
    name: "id",
    in: "path",
    description: "Task ID",
    required: true,
    schema: {
      type: "string"
    }
  },
  {
    name: "task",
    in: "body",
    description: "Task ID",
    required: true,
    schema: {
      type: "object",
      $ref: "#/components/schemas/Task"
    }
  }],
  responses: {
    200: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Task",
            example: [{
              id: 1,
              ownerId: 1,
              title: "Task 1",
              description: "Description 1",
              status: "new",
              createdAt: "2021-08-01T00:00:00.000Z",
              updatedAt: "2021-08-01T00:00:00.000Z"
            },
            {
              id: 2,
              ownerId: 2,
              title: "Task 2",
              description: "Description example",
              status: "new",
              createdAt: "2021-08-01T00:00:00.000Z",
              updatedAt: "2021-08-01T00:00:00.000Z"
            }]
          }
        }
      },
      description: "OK."
    },
    400: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResponseInfo",
            example: {
              code: 400,
              message: "Bad Request"
            }
          }
        }
      },
      description: "Error. We've found some inconsistency with your request."
    },
    401: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResponseInfo",
            example: {
              code: 401,
              message: "Acess Denied"
            }
          }
        }
      },
      description: "Error. User is not authenticated."
    }
  }
}

export const ListTask: IRoutePathMethod = {
  tags: [
    "Tasks"
  ],
  summary: "Get all tasks from user or shared with him",
  description: "Returns task from database",
  operationId: "GetTask",
  security: {
    Bearer: []
  },
  produces: [
    "application/json"
  ],
  parameters: [{
    name: "id",
    in: "path",
    description: "Task ID",
    required: true,
    schema: {
      type: "string"
    }
  }],
  responses: {
    200: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Task",
            example: {
              id: 1,
              ownerId: 1,
              title: "Task 1",
              description: "Description 1",
              status: "new",
              createdAt: "2021-08-01T00:00:00.000Z",
              updatedAt: "2021-08-01T00:00:00.000Z"
            }
          }
        }
      },
      description: "OK."
    },
    400: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResponseInfo",
            example: {
              code: 400,
              message: "Bad Request"
            }
          }
        }
      },
      description: "Error. We've found some inconsistency with your request."
    },
    401: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResponseInfo",
            example: {
              code: 401,
              message: "Acess Denied"
            }
          }
        }
      },
      description: "Error. User is not authenticated."
    },
    202: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResponseInfo",
            example: {
              code: 202,
              message: "There are no tasks for this user."
            }
          }
        }
      },
      description: "Error. Sorry, we do not have anything for you now."
    }
  }
}
