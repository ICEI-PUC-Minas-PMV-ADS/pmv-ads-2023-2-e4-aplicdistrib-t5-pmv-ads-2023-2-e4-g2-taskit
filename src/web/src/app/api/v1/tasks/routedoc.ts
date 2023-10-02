import { IRouteDoc } from "@/shared/interfaces/apidocs.interface";
import { DeleteTask, GetTask, UpdateTask } from "./[id]/route";

export const TaskRouteDoc: IRouteDoc = {
  tags: [
    {
      name: "Tasks",
      description: "Things that users need to do."
    }
  ],
  paths: {
    "/api/v1/tasks": {
      
    },
    "/api/v1/tasks/{id}": {
      get: GetTask,
      put: UpdateTask,
      delete: DeleteTask,
    }
  },
  components: {
    schemas: {
      Task: {
        type: "object",
        required: ["id", "title"],
        properties: {
          id: {
            type: "string"
          },
          title: {
            type: "string"
          },
          description: {
            type: "string"
          },
          status: {
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
