import { NextResponse } from "next/server";

import { TaskRouteDoc } from './tasks/routedoc'
import { UserRouteDoc } from './users/routedoc'

export function GET(req: Request) {
  const tags: any = [];

  if (TaskRouteDoc.tags) {
    tags.push(...TaskRouteDoc.tags);
  }

  if (UserRouteDoc.tags) {
    tags.push(...UserRouteDoc.tags);
  }

  return NextResponse.json({
    openapi: "3.1.0",
    info: {
      title: "Taskit API",
      version: "0.2.0"
    },
    host: "http://localhost:3000",
    schemes: [
      "https",
      "http"
    ],
    basePath: '/api/v1',
    tags: tags,
    paths: {
      ...TaskRouteDoc.paths,
      ...UserRouteDoc.paths
    },
    components: {
      schemas: {
        ...TaskRouteDoc.components?.schemas,
        ...UserRouteDoc.components?.schemas,
        Error: {
          type: "object",
          properties: {
            code: {
              type: "integer",
              format: "int32"
            },
            message: {
              type: "string"
            }
          }
        }
      }
    }
  });
}
