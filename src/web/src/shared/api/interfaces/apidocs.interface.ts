type IMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

export interface IRouteTag {
  name: string;
  description: string;
}

export interface IRouteSchemas {
  [key: string]: {
    type: string;
    required?: string[];
    properties: {
      [key: string]: {
        type: string;
        items?: {
          $ref: string;
        }
        format?: string;
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
      $ref?: string;
      properties?: {
        [key: string]: {
          type: string;
          format?: string;
        }
      };
    }
  }[],
  responses: {
    200: IResponse,
    [key: string]: IResponse,
  } | {
    200: IResponse,
    401: IResponse,
    [key: string]: IResponse,
  },
  security?: {
    [key: string]: []
  },
}

export interface IResponse {
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

export interface IRouteDoc {
  tags?: IRouteTag[];
  components?: {
    schemas: IRouteSchemas
  },
  paths: IRoutePath
}
