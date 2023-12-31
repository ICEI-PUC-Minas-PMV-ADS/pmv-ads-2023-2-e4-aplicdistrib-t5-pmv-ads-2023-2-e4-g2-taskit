import { IRouteDoc } from "@/shared/api/interfaces/apidocs.interface";
import { Logout } from "./logout/route";
import { Login } from "./login/route";

export const AuthRouteDoc: IRouteDoc = {
  tags: [
    {
      "name": "Auth",
      "description": "Creates and invalidates user sessions."
    }
  ],
  paths: {
    "/api/v1/auth/login": {
      put: Login
    },
    "/api/v1/auth/logout": {
      put: Logout,
    }
  },
  components: {
    schemas: {
      Session: {
        type: "object",
        required: [ "id", "token", "expires", "userId" ],
        properties: {
          id: {
            type: "string"
          },
          token: {
            type: "string"
          },
          expires: {
            type: "string"
          },
          userId: {
            type: "string"
          }
        }
      }
    }
  }
}
