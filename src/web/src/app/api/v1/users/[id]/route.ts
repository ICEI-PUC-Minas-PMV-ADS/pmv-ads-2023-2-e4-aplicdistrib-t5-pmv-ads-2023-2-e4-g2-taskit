import { User } from "@prisma/client";
import { NextResponse } from "next/server";
import { sha256 } from "js-sha256";
import JWT from 'jsonwebtoken';

import { verifyToken } from "@/shared/api/utils/verifyToken";
import { IRoutePathMethod } from "@/shared/api/interfaces/apidocs.interface";
import { UserController } from "../user.controller";

interface UsersParams {
  params: {
    id: string;
  }
}

/**
 * Get user data from database
 * @description check GetUser bellow to see the route documentation
 */
export async function GET(req: Request, { params }: UsersParams) {
  /** Check Token Validity */
  try {
    const token = req.headers?.get('Authorization')?.split('Bearer ')[1]!;
    const tokenUser: any = JWT.decode(token);
    JWT.verify(token, tokenUser.email);
  } catch (err) {
    return NextResponse.json({ code: 401, message: "Access Denied" }, { status: 401 });
  }
  const url = new URL(req.url);
  const isAuthenticated = await verifyToken(req);
  if (!isAuthenticated) return NextResponse.json({ message: 'Access Denied', code: 401, redirectTo: url.host + '/login' }, { status: 401 });
  /** End of Check Token Validity */    
  try {
    let user: any;
    const userId: string = params.id;
    if (!userId.includes('@')) {
      user = await UserController.Get(userId);
    } else {
      user = await UserController.GetByEmail(params.id);
    }
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ code: 404, message: "User not found." }, { status: 404 });
  }
}

/**
 * Edit user data in the database
 * @description check UpdateUser bellow to see the route documentation
 */
export async function PUT(req: Request, { params }: UsersParams) {
  /** Check Token Validity */
  try {
    const token = req.headers?.get('Authorization')?.split('Bearer ')[1]!;
    const tokenUser: any = JWT.decode(token);
    if (params.id !== tokenUser.id) return NextResponse.json({ code: 401, message: "Access Denied" }, { status: 401 });
    JWT.verify(token, tokenUser.email);
  } catch (err) {
    return NextResponse.json({ code: 401, message: "Access Denied" }, { status: 401 });
  }
  const url = new URL(req.url);
  const isAuthenticated = await verifyToken(req);
  if (!isAuthenticated) return NextResponse.json({ message: 'Access Denied', code: 401, redirectTo: url.host + '/login' }, { status: 401 });
  /** End of Check Token Validity */

  const user: User = await req.json();
  if (user.password && user.password !== '') {
    user.password = sha256.hmac(user.email!.toLowerCase(), user.password);
  }

  try {
    const updatedUser = await UserController.Update({ ...user, id: params.id });
    return NextResponse.json(updatedUser);
  } catch (err) {
    return NextResponse.json({ code: 404, message: "User not found." }, { status: 404 });
  }
}

/**
 * Deletes an user from database
 * @description check DeleteUser bellow to see the route documentation
 */
export async function DELETE(req: Request, { params }: UsersParams) {
  /** Check Token Validity */
  try {
    const token = req.headers?.get('Authorization')?.split('Bearer ')[1]!;
    const tokenUser: any = JWT.decode(token);
    if (params.id !== tokenUser.id) return NextResponse.json({ code: 401, message: "Access Denied" }, { status: 401 });
    JWT.verify(token, tokenUser.email);
    const url = new URL(req.url);
    const isAuthenticated = await verifyToken(req);
    if (!isAuthenticated) return NextResponse.json({ message: 'Access Denied', code: 401, redirectTo: url.host + '/login' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ code: 401, message: "Access Denied" }, { status: 401 });
  }
  /** End of Check Token Validity */  
  
  try {
    const deletedUser = await UserController.Delete(params.id);
    return NextResponse.json({ message: "User deleted. Good bye " + deletedUser.name + "!" }, { status: 200, });
  } catch (err) {
    return NextResponse.json({ code: 404, message: "User not found." }, { status: 404 });
  }
}

export const GetUser: IRoutePathMethod = {
  tags: [
    "Users"
  ],
  summary: "Get user",
  description: "Returns user from database",
  operationId: "GetUser",
  security: {
    Bearer: []
  },
  parameters: [{
    name: "id",
    in: "path",
    description: "User's id or email",
    required: true,
    schema: {
      type: "string",
    }
  }],
  produces: [
    "application/json"
  ],
  responses: {
    200: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/User",
            example: {
              id: 1,
              name: "Aaron",
              email: "aaron@taskit.com",
              createdAt: "2021-08-01T00:00:00.000Z",
              updatedAt: "2021-08-01T00:00:00.000Z"
            }
          }
        }
      },
      description: "OK. User found."
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
              message: "User not found!"
            }
          }
        }
      },
      description: "Error. User does not exist."
    }
  }
};

export const UpdateUser: IRoutePathMethod = {
  tags: [
    "Users"
  ],
  summary: "Update user",
  description: "Updates user from database",
  operationId: "UpdateUser",
  security: {
    Bearer: []
  },
  parameters: [{
    name: "user",
    in: "body",
    description: "User data to be updated",
    required: true,
    schema: {
      type: "object",
      $ref: "#/components/schemas/UpdateUserDTO"
    }
  },
  {
    name: "id",
    in: "path",
    description: "User ID",
    required: true,
    schema: {
      type: "integer"
    }
  }],
  produces: [
    "application/json"
  ],
  responses: {
    200: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/User",
            example: {
              id: 1,
              name: "Aaron",
              email: "aaron@taskit.com",
              createdAt: "2021-08-01T00:00:00.000Z",
              updatedAt: "2021-08-01T00:00:00.000Z"
            }
          }
        }
      },
      description: "OK. User Updated."
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
              message: "User not found!"
            }
          }
        }
      },
      description: "Error. User does not exist."
    }
  }
};


export const DeleteUser: IRoutePathMethod = {
  tags: [
    "Users"
  ],
  summary: "Delete user",
  description: "Deletes user from database",
  operationId: "DeleteUser",
  security: {
    Bearer: []
  },
  produces: [
    "application/json"
  ],
  parameters: [{
    name: "id",
    in: "path",
    description: "User ID or User Email",
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
              message: "User deleted. Good bye Aaron!"
            }
          }
        }
      },
      description: "OK. User deleted."
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
              message: "User not found!"
            }
          }
        }
      },
      description: "Error. User does not exist."
    }
  }
}
