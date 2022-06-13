import { HttpRequest, InvocationContext } from "@azure/functions-newC";

export async function httpMultipleOutputs(context: InvocationContext, req: HttpRequest): Promise<any> {
    let retMsg = 'Hello, world!';
    return {
        httpResponse: {
            body: retMsg
        },
        queueOutput: retMsg
    };
};