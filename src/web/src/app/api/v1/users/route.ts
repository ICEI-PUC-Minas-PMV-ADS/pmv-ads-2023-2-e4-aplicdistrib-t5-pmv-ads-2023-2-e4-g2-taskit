import { NextResponse } from "next/server";
import { sha256 } from "js-sha256";

import { IRoutePathMethod } from "@/shared/interfaces/apidocs.interface";
import { UserService } from "./user.service";
import { useServerAuth } from "@/shared/api/useServerAuth";

const GetMethod: IRoutePathMethod = {
  tags: [
    "Users"
  ],
  summary: "List users data from database.",
  description: "",
  operationId: "getUsers",
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
            $ref: "#/components/schemas/Error",
            example: {
              code: 204,
              message: "There are no users in the database."
            }
          }
        }
      },
      description: "No content"
    }
  }
}
export async function GET(req: Request) {
  const url = new URL(req.url);
  const isAuthenticated = await useServerAuth(req);
  if (!isAuthenticated) return NextResponse.json({ message: 'Access Denied', code: 403, redirectTo: url.host + '/login' }, { status: 403 });

  const users = await UserService.List();
  return NextResponse.json(users);
}

interface NewUser {
  name: string;
  email: string;
  password: string;
}
export async function POST(req: Request) {
  const user: NewUser = await req.json();
  let password = sha256.hmac(user.email.toLowerCase(), user.password);
  const newUser = UserService.Create({ ...user, email: user.email.toLowerCase(), password });
  return NextResponse.json(newUser);
}

export const UserMethods = {
  get: GetMethod
}
