import { NextResponse } from "next/server";

import { AuthService } from "../auth.service";
import { IRoutePathMethod } from "@/shared/interfaces/apidocs.interface";
import { useServerAuth } from "@/shared/api/useServerAuth";

export async function PUT(req: Request) {
  const url = new URL(req.url);  
  const isAuthenticated = await useServerAuth(req);
  if (!isAuthenticated) return NextResponse.json({ code: 403, message: 'Access Denied.', redirectTo: url.host + '/login' }, { status: 403 });

  const { sessionId, userId }: any = await req.json();
  if (!sessionId || !userId) return NextResponse.json({ code: 400, message: 'Bad Request.' }, { status: 400 });

  await AuthService.Invalidate(sessionId, userId);

  return NextResponse.json({ code: 200, message: 'Logged out. Session Invalidated.' }, { status: 200 });
}

export const Logout: IRoutePathMethod = {
  tags: [
    "Auth"
  ],
  summary: "Log user out",
  description: "Invalidates user's session by session id.",
  operationId: "Logout",
  security: {
    Bearer: []
  },
  produces: [
    "application/json"
  ],
  parameters: [
    {
      name: "id",
      in: "body",
      description: "Session id to be invalidated",
      required: true,
      schema: {
        type: "object",
        properties: {
          sessionId: {
            type: "integer"
          },
          userId: {
            type: "integer"
          },
        }
      }
    }
  ],
  responses: {
    200: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResponseInfo",
            example: {
              code: 200,
              message: "Logged out. Session Invalidated.",
            }
          }
        }
      },
      description: "OK. Session Invalidated."
    },
    400: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResponseInfo",
            example: {
              code: 400,
              message: "Bad Request.",
            }
          }
        }
      },
      description: "Bad Request. Missing session id or user id."
    },
    401: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResponseInfo",
            example: {
              code: 403,
              message: "Access Denied.",
              redirectTo: "localhost:3000/login",
            }
          }
        }
      },
      description: "Access Denied. User is not logged in."
    }
  }
}
