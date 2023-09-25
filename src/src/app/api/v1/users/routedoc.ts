import { IRouteDoc } from "@/shared/interfaces/apidocs.interface";
import { UserMethods } from "./route";

export const UserRouteDoc: IRouteDoc = {
  tags: [
    {
      "name": "Users",
      "description": "Things who need to do tasks."
    }
  ],
  paths: {
    "/users": {
      get: UserMethods.get
    }
  },
  components: {
    schemas: {
      User: {
        type: "object",
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
      }
    }
  }
}
