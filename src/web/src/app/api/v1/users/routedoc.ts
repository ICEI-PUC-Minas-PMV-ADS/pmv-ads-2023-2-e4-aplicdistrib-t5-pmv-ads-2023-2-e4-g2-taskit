import { IRouteDoc } from "@/shared/api/interfaces/apidocs.interface";
import { GetUsers, CreateUser } from "./route";
import { DeleteUser, UpdateUser, GetUser } from "./[id]/route";

export const UserRouteDoc: IRouteDoc = {
  tags: [
    {
      "name": "Users",
      "description": "Things who need to do tasks."
    }
  ],
  paths: {
    "/api/v1/users": {
      get: GetUsers,
      post: CreateUser
    },
    "/api/v1/users/{id}": {
      get: GetUser,
      put: UpdateUser,
      delete: DeleteUser
    }
  },
  components: {
    schemas: {
      User: {
        type: "object",
        required: ["id", "name", "email"],
        properties: {
          id: {
            type: "string"
          },
          name: {
            type: "string"
          },
          avatar: {
            type: "string",
            format: "url"
          },
          email: {
            type: "string",
            format: "email"
          },
          tasks: {
            type: "array",
            items: {              
              $ref: "#/components/schemas/Task"
            }
          },
          sessions: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Session"
            }
          },
          password: {
            type: "string",
            format: "password"
          },
          createdAt: {
            type: "string",
            format: "date-time"
          },
          updatedAt: {
            type: "string",
            format: "date-time"
          }
        }
      },
      NewUserDTO: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: {
            type: "string"
          },
          avatar: {
            type: "string",
            format: "url",
          },
          email: {
            type: "string",
            format: "email",
          },
          password: {
            type: "string",
            format: "password",
          },
        }
      },
      UpdateUserDTO: {
        type: "object",
        properties: {
          name: {
            type: "string"
          },
          email: {
            type: "string",
            format: "email",
          },
          avatar: {
            type: "string",
            format: "url",
          },
          password: {
            type: "string",
            format: "password",
          },
        }
      }
    }
  }
}
