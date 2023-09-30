type IMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

export interface IRouteTag {
  name: string;
  description: string;
}

export interface IRouteSchemas {
  [key: string]: {
    type: string;
    properties: {
      [key: string]: {
        type: string;
      }
    }
  }
}

export interface IRoutePath {
  [key: string]: {
    [method in IMethod]?: IRoutePathMethod;
  }
}

export interface IRoutePathMethod {
  tags?: string[];
  summary: string;
  description: string;
  operationId?: string;
  produces?: string[]
  parameters?: {
    name: string;
    in: string;
    description: string;
    required: boolean;
    schema: {
      type: string;
    }
  }[],
  responses: {
    200: {
      description: string;
      content: {
        [key: string]: {
          schema: {
            type?: string;
            items?: {
              $ref: string;
            }
            $ref?: string;
            example?: any;
          }
        }
      }
    },
    [key: string]: {
      description: string;
      content: {
        [key: string]: {
          schema: {
            type?: string;
            items?: {
              $ref: string;
            }
            $ref?: string;
            example?: any;
          }
        }
      }
    }
  }
}

export interface IRouteDoc {
  tags?: IRouteTag[];
  components?: {
    schemas: IRouteSchemas
  },
  paths: IRoutePath
}
