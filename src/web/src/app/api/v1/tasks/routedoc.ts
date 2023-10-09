import { IRouteDoc } from "@/shared/api/interfaces/apidocs.interface";
import { DeleteTask, GetTask, UpdateTask } from "./[id]/route";
import { CreateTask, ListTask } from "./route";
import { ShareTask, UnshareTask } from "./[id]/share/route";

export const TaskRouteDoc: IRouteDoc = {
  tags: [
    {
      name: "Tasks",
      description: "Things that users need to do."
    }
  ],
  paths: {
    "/api/v1/tasks/": {
      post: CreateTask,
      get: ListTask,
    },      
    "/api/v1/tasks/{id}": {      
      get: GetTask,
      put: UpdateTask,
      delete: DeleteTask,
    },
    "/api/v1/tasks/{id}/share": {
      put: ShareTask,
      patch: UnshareTask,
    },
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
      },
      Share: {
        type: "object",
        required: ["userId", "permission"],
        properties: {
          userId: {
            type: "string"
          },
          permission: {
            type: "string"
          },
        }
      }
    }
  }
}
