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
  return NextResponse.json({ status: "ok" });
}

export const UserMethods = {
  get: GetMethod
}
