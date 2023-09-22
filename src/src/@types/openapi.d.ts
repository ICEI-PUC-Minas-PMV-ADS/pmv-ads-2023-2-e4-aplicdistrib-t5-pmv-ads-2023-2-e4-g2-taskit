import type {
    OpenAPIClient,
    Parameters,
    UnknownParamsObject,
    OperationResponse,
    AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface Task {
            id: number;
            title: string;
            description?: string;
            category?: string;
            time?: Date;
        }
    }
}
declare namespace Paths {
    namespace GetTaskById {
        namespace Responses {
            export type $200 = Components.Schemas.Pet[];
        }
    }
}

export interface OperationMethods {
    /**
     * getTaskById
     */
    'getTaskById'(
        parameters?: Parameters<UnknownParamsObject> | null,
        data?: any,
        config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetTaskById.Responses.$200>
}

export interface PathsDictionary {
    ['/api/task/[id]']: {
        /**
         * getTask
         */
        'get'(
            parameters?: Parameters<UnknownParamsObject> | null,
            data?: any,
            config?: AxiosRequestConfig
        ): OperationResponse<Paths.GetTaskById.Responses.$200>
    }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>