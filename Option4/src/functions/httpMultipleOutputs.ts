import { Context, HttpRequest } from "@azure/functions";

export async function httpMultipleOutputs(context: Context, req: HttpRequest): Promise<any> {
    let retMsg = 'Hello, world!';
    return {
        httpResponse: {
            body: retMsg
        },
        queueOutput: retMsg
    };
};

export const httpMultipleOutputsMetadata = {
    bindings: [
        {
            authLevel: "anonymous",
            type: "httpTrigger",
            direction: "in",
            name: "req",
            methods: [
                "get",
                "post"
            ]
        },
        {
            type: "http",
            direction: "out",
            name: "res"
        },
        {
            type: "queue",
            direction: "out",
            name: "queueOutput",
            queueName: "testQueue",
            connection: "teststor_STORAGE"
        }
    ]
};