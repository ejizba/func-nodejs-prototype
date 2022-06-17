import { HttpRequest, InvocationContext } from "@azure/functions-newC";

export async function httpMultipleOutputs(context: InvocationContext, req: HttpRequest): Promise<any> {
    context.log(`HTTP trigger function processed a request. RequestUrl=${req.url}`);

    const name = req.query.name || req.body?.name || 'world';
    return {
        httpResponse: {
            body: `Hello, ${name}!`
        },
        queueOutput: { name }
    };
};