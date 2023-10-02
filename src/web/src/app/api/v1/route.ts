import { NextResponse } from "next/server";

import { TaskRouteDoc } from './tasks/routedoc'
import { UserRouteDoc } from './users/routedoc'
import { AuthRouteDoc } from './auth/routedoc'

export function GET(req: Request) {
  const tags: any = [];

  if (TaskRouteDoc.tags) {
    tags.push(...TaskRouteDoc.tags);
  }
  
  if (UserRouteDoc.tags) {
    tags.push(...UserRouteDoc.tags);
  }

  if (AuthRouteDoc.tags) {
    tags.push(...AuthRouteDoc.tags);
  }

  return NextResponse.json({
    openapi: "3.1.0",
    info: {
      title: "Taskit API",
      version: "0.2.0",
      description: "No momento as rotas que precisam de autenticação deverão ser testadas fora do Swagger. Recomendamos usar a extensão Thunder Client no VSCode ou o Postman."
    },
    schemes: [
      "https",
      "http"
    ],
    host: "localhost:3000",
    basePath: '/api/v1',
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development"
      },
      {
        url: "https://taskit.aaroncarneiro.com",
        description: "Production"
      },
      {
        url: "https://taskit-three.vercel.app",
        description: "Production (Alternative domain)"
      }
    ],
    tags: tags,
    paths: {
      ...TaskRouteDoc.paths,
      ...UserRouteDoc.paths,
      ...AuthRouteDoc.paths,
    },
    components: {
      securitySchemes: {
        Bearer: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        ...TaskRouteDoc.components?.schemas,
        ...UserRouteDoc.components?.schemas,
        ...AuthRouteDoc.components?.schemas,
        ResponseInfo: {
          type: "object",
          required: [ "code", "message" ],
          properties: {
            code: {
              type: "integer",
              format: "int32"
            },
            message: {
              type: "string"
            },
            redirectTo: {
              type: "string"
            }
          }
        }
      }
    }
  });
}
