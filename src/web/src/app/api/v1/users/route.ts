import { NextResponse } from "next/server";
import { sha256 } from "js-sha256";

import { UserService } from "./user.service";
import { verifyToken } from "@/shared/api/utils/verifyToken";
import { IRoutePathMethod } from "@/shared/api/interfaces/apidocs.interface";

/**
 * Get all users from database
 * @description check GetUsers bellow to see the route documentation
 */
export async function GET(req: Request) {
  const url = new URL(req.url);

  const isAuthenticated = await verifyToken(req);
  if (!isAuthenticated) return NextResponse.json({ code: 401, message: 'Access Denied', redirectTo: url.host + '/login' }, { status: 401 });

  const users = await UserService.List();
  if (!users || users.length === 0) return NextResponse.json({ code: 204, message: "There are no users in the database" }, { status: 204 });

  return NextResponse.json(users);
}

interface NewUser {
  name: string;
  email: string;
  password: string;
}

/**
 * Create a new user
 * @description check CreateUser bellow to see the route documentation
 */
export async function POST(req: Request) {
  const user: NewUser = await req.json();
  let password = sha256.hmac(user.email.toLowerCase(), user.password);

  const userExists = await UserService.GetByEmail(user.email);
  if (userExists) return NextResponse.json({ code: 409, message: "User already exists." }, { status: 409 });

  const newUser = await UserService.Create({ ...user, email: user.email.toLowerCase(), password });
  return NextResponse.json(newUser);
}

export const CreateUser: IRoutePathMethod = {
  tags: [
    "Users"
  ],
  summary: "Create user",
  description: "Add a new user to database and return it.",
  operationId: "PostUser",
  produces: [
    "application/json"
  ],
  parameters: [
    {
      name: "user",
      in: "body",
      description: "User object that needs to be added to the database",
      required: true,
      schema: {
        type: "object",
        $ref: "#/components/schemas/NewUserDTO"
      }
    }
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
              email: "edu@aaroncarneiro.com",
              updatedAt: new Date().toISOString(),
            }
          }
        }
      },
      description: "OK. User created."
    },
    409: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResponseInfo",
            example: {
              code: 409,
              message: "User already exists."
            }
          }
        }
      },
      description: "Error. Duplicated user."
    }
  }
}

export const GetUsers: IRoutePathMethod = {
  tags: [
    "Users"
  ],
  summary: "List users data from database.",
  description: "",
  operationId: "GetUsers",
  security: {
    Bearer: []
  },
  produces: [
    "application/json"
  ],
  responses: {
    200: {
      content: {
        task: {
          schema: {
            type: "array",
            items: {
              $ref: "#/components/schemas/User"
            }
          }
        }
      },
      description: "OK"
    },
    204: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResponseInfo",
            example: {
              code: 204,
              message: "There are no users in the database"
            }
          }
        }
      },
      description: "Ok. No content"
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
