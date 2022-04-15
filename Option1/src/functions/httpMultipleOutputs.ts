import { HttpCallback, HttpRequest, InvocationContext, OutputBindingValue } from "@azure/functions-new1";

export const httpMultipleOutputs: HttpCallback = async function (context: InvocationContext, req: HttpRequest): Promise<OutputBindingValue> {
    let retMsg = 'Hello, world!';
    return {
        httpResponse: {
            body: retMsg
        },
        queueOutput: retMsg
    };
};