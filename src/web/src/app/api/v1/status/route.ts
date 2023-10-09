import { db } from "@/shared/api/database/db.connection";
import { IRoutePathMethod } from "@/shared/api/interfaces/apidocs.interface";
import { IRouteDoc } from "@/shared/api/interfaces/apidocs.interface";

export async function GET() {
  return await db.status.findMany({
    select: {
      id: true,
      label: true,
    },
  })
}

const GetStatus: IRoutePathMethod = {

  tags: [
    "Status"
  ],
  summary: "Get status",
  description: "Return all status from database.",
  operationId: "GetStatus",
  produces: [
    "application/json"
  ],
  responses: {
    200: {
      content: {
        "application/json": {
          schema: {
            type: "array",
            $ref: "#/components/schemas/Status",
            example: [{
              id: "65236540d03e721a2a6209d8",
              label: "new",
            }, {
              id: "65236590d03e721a2a6209d9",
              label: "active",
            }, {
              id: "6523659fd03e721a2a6209da",
              label: "finished",
            }, {
              id: "652365afd03e721a2a6209db",
              label: "canceled",
            }]
          }
        }
      },
      description: "OK. User created."
    }
  }
}


export const StatusRouteDoc: IRouteDoc = {
  tags: [
    {
      "name": "Users",
      "description": "Things who need to do tasks."
    }
  ],
  paths: {
    "/api/v1/status": {
      get: GetStatus,
    }
  },
  components: {
    schemas: {
      Status: {
        type: "object",
        required: ["id", "label"],
        properties: {
          id: {
            type: "string"
          },
          label: {
            type: "string"
          },
        }
      }
    }
  }
}
