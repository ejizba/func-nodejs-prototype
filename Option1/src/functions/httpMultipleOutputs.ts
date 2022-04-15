import { HttpRequest, InvocationContext } from "@azure/functions-new1";

export async function httpMultipleOutputs(context: InvocationContext, req: HttpRequest): Promise<any> {
    let retMsg = 'Hello, world!';
    return {
        httpResponse: {
            body: retMsg
        },
        queueOutput: retMsg
    };
};