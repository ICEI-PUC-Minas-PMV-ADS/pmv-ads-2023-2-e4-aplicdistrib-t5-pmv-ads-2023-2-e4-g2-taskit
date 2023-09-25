import { IRoutePathMethod } from "@/shared/interfaces/apidocs.interface";
import { NextResponse } from "next/server";

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
export function GET(req: Request) {
  return NextResponse.json([
    {
      "id": 1,
      "name": "Aaron Carneiro",
      "email": "edu@aaroncanreiro.com",
      "password": "eyJwYXNzd29yZCI6IjEyMzQ2NS",
      "createdAt": new Date(2023, 7, 12, 19, 30, 12),
      "updatedAt": new Date(Date.now())
    }
  ]);
}

export const UserMethods = {
  get: GetMethod
}
