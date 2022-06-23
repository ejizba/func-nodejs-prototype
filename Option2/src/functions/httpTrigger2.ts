import { HttpRequest, InvocationContext } from "@azure/functions-newC";

export async function httpTrigger2(context: InvocationContext, req: HttpRequest): Promise<any> {
    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body?.name || 'world';

    return {
        httpResponse: {
            body: `Hello, ${name}!`
        },
        queueOutput: { name }
    };
};