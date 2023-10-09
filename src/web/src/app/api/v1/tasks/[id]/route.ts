import { NextResponse } from "next/server";
import JWT from 'jsonwebtoken';

import { verifyToken } from "@/shared/api/utils/verifyToken";
import { IRoutePathMethod } from "@/shared/api/interfaces/apidocs.interface";
import { TaskService } from "../task.service";

interface TasksParams {
  params: {
    id: string;
  }
}
export async function GET(req: Request, { params }: TasksParams) {
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

  try {
    const task = TaskService.Get(params.id, tokenUser.id);
    return NextResponse.json(task);
  } catch (err) {
    return NextResponse.json({ code: 404, message: "Task not found." }, { status: 404 });
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

  const task = await req.json();
  if (!task) return NextResponse.json({ code: 400, message: "Bad Request" }, { status: 400 });

  try {
    const taskId = params.id;
    const userId = tokenUser.id;
    const updatedTask = await TaskService.Update(taskId, task, userId);
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (err) {
    return NextResponse.json({ code: 404, message: "Task not found." }, { status: 404 });
  }
}

export async function DELETE(req: Request, { params }: TasksParams) {
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

  try {
    await TaskService.Delete(params.id, tokenUser.id);
    return NextResponse.json({ message: "Task deleted" }, { status: 200, });
  } catch (err) {
    return NextResponse.json({ code: 404, message: "Task not found!" }, { status: 404 });
  }
}

export const UpdateTask: IRoutePathMethod = {
  tags: [
    "Tasks"
  ],
  summary: "Update task",
  description: "Updates task from database",
  operationId: "UpdateTask",
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

export const DeleteTask: IRoutePathMethod = {
  tags: [
    "Tasks"
  ],
  summary: "Delete task",
  description: "Deletes task from database",
  operationId: "DeleteTask",
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
            $ref: "#/components/schemas/ResponseInfo",
            example: {
              code: 200,
              message: "Task deleted"
            }
          }
        }
      },
      description: "OK. Task deleted."
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

export const GetTask: IRoutePathMethod = {
  tags: [
    "Tasks"
  ],
  summary: "Get task",
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
