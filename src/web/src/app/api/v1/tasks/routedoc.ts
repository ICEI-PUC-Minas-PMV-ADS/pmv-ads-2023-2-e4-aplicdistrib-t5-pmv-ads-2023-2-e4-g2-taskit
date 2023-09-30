import { IRouteDoc } from "@/shared/interfaces/apidocs.interface";

export const TaskRouteDoc: IRouteDoc = {
    tags: [
        {
            name: "Tasks",
            description: "Things that users need to do."
        }
    ],
    paths: {
        "/api/v1/tasks": {
            get: {
                tags: [
                    "Tasks"
                ],
                summary: "List tasks data from database.",
                description: "",
                operationId: "getTasks",
                produces: [
                    "application/json"
                ],
                responses: {
                    200: {
                        content: {
                            task: {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Task"
                                    }
                                }
                            }
                        },
                        description: "OK"
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            Task: {
                type: "object",
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
