import { FunctionContext, HttpCallback, HttpRequest, OutputBindingValue } from "@azure/functions-new";

export const httpMultipleOutputs: HttpCallback = async function (context: FunctionContext, req: HttpRequest): Promise<OutputBindingValue> {
    let retMsg = 'Hello, world!';
    return {
        httpResponse: {
            body: retMsg
        },
        queueOutput: retMsg
    };
};