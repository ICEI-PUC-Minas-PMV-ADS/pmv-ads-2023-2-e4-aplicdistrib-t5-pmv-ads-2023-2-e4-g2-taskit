import { NextResponse } from "next/server";
import JWT from 'jsonwebtoken';

import { verifyToken } from "@/shared/api/utils/verifyToken";
import { IRoutePathMethod } from "@/shared/api/interfaces/apidocs.interface";
import { TaskService } from "../../task.controller";

interface TasksParams {
  params: {
    id: string;
  }
}
export async function PUT(req: Request, { params }: TasksParams) {
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

  const { userId, permission } = await req.json();
  if (!userId || !['edit', 'view'].includes(permission)) return NextResponse.json({ code: 400, message: "Bad Request" }, { status: 400 });

  try {
    const task = await TaskService.VerifyOwner(params.id, tokenUser.id);
    if (!task) return NextResponse.json({ code: 401, message: "Access Denied" }, { status: 401 });
    const updatedTask = await TaskService.Share(task.id, userId, permission);
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (err) {
    return NextResponse.json({ code: 404, message: "Task not found." }, { status: 404 });
  }
}

export async function PATCH(req: Request, { params }: TasksParams) {
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

  const { userId, permission } = await req.json();
  if (!userId || !['edit', 'view'].includes(permission)) return NextResponse.json({ code: 400, message: "Bad Request" }, { status: 400 });

  try {
    const task = await TaskService.VerifyOwner(params.id, tokenUser.id);
    if (!task) return NextResponse.json({ code: 401, message: "Access Denied" }, { status: 401 });
    const updatedTask = await TaskService.Unshare(params.id, userId);
    return NextResponse.json(updatedTask, { status: 200 });    
  } catch (err) {
    return NextResponse.json({ code: 404, message: "Task not found." }, { status: 404 });
  }
}

export const ShareTask: IRoutePathMethod = {
  tags: [
    "Tasks"
  ],
  summary: "Share task",
  description: "Shares task with other user",
  operationId: "ShareTask",
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
    name: "userId",
    in: "body",
    description: "Who to share with and permission level (edit or view)",
    required: true,
    schema: {
      type: "object",
      $ref: "#/components/schemas/Share"
    },
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
      description: "OK. Task Updated."
    },
    400: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResponseInfo",
            example: {
              code: 401,
              message: "Bad Request"
            }
          }
        }
      },
      description: "Error. Empty body."
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
    404: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResponseInfo",
            example: {
              code: 401,
              message: "Task not found!"
            }
          }
        }
      },
      description: "Error. Task does not exist."
    }
  }
}


export const UnshareTask: IRoutePathMethod = {
  tags: [
    "Tasks"
  ],
  summary: "Unshare task",
  description: "Unshares task with other user",
  operationId: "UnshareTask",
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
    name: "userId",
    in: "body",
    description: "Who to share with",
    required: true,
    schema: {
      type: "string",
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
      description: "OK. Task Updated."
    },
    400: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResponseInfo",
            example: {
              code: 401,
              message: "Bad Request"
            }
          }
        }
      },
      description: "Error. Empty body."
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
    404: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResponseInfo",
            example: {
              code: 401,
              message: "Task not found!"
            }
          }
        }
      },
      description: "Error. Task does not exist."
    }
  }
}
