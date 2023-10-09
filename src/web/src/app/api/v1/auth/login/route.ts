import { NextResponse } from "next/server";
import { sha256 } from "js-sha256";
import jwt from "jsonwebtoken";

import { AuthService } from "../auth.service";
import { IRoutePathMethod } from "@/shared/api/interfaces/apidocs.interface";

export async function PUT(req: Request) {
  const { email, password, sessionId }: any = await req.json();

  if (!email || !password) return NextResponse.json({ code: 400, message: "Bad Request" }, { status: 400 });

  const hash = sha256.hmac(email.toLowerCase(), password);
  const user = await AuthService.Login(email, hash);

  if (!user) return NextResponse.json({ code: 401, message: "Invalid Credentials" }, { status: 401 });

  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, email, { expiresIn: "336h" });

  let session;
  if (!sessionId) {
    session = await AuthService.Create({ sessionToken: token, userId: user.id, expires: new Date(Date.now() + 336 * 60 * 60 * 1000) });    
  } else {
    session = await AuthService.Create({ id: sessionId, sessionToken: token, userId: user.id, expires: new Date(Date.now() + 336 * 60 * 60 * 1000) });
  }

  return NextResponse.json({ id: session.id, token: session.sessionToken, expires: session.expires });
}

export const Login: IRoutePathMethod = {
  tags: [
    "Auth"
  ],
  summary: "Log user in",
  description: "Validates user's session",
  operationId: "Login",
  produces: [
    "application/json"
  ],
  parameters: [
    {
      name: "id",
      in: "params",
      description: "Create a new session for user",
      required: true,
      schema: {
        type: "integer",
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
              token: "fd8613i6o3gd0sdh9v89qy398ctn8y3hex32.c23rhh30imv0i408yx9.3corjviuqcxw.3afasc3q37j37",
              expires: new Date().toISOString(),
              userId: 1,
            }
          }
        }
      },
      description: "OK. Session created."
    },
    401: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResponseInfo",
            example: {
              code: 401,
              message: "Invalid Credentials"
            }
          }
        }
      },
      description: "Unauthorized. Invalid Credentials."
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
      description: "Bad Request. Missing email or password."
    }
  }
}
