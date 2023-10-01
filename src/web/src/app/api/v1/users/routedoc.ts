import { IRouteDoc } from "@/shared/interfaces/apidocs.interface";
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
          email: {
            type: "string"
          },
          password: {
            type: "string"
          },
          createdAt: {
            type: "string"
          },
          updatedAt: {
            type: "string"
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
          email: {
            type: "string"
          },
          password: {
            type: "string"
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
            type: "string"
          },
          password: {
            type: "string"
          },
        }
      }
    }
  }
}
