import { HttpOutputOptions, HttpRequest, HttpResponse, HttpTriggerOptions, InvocationContext } from "@azure/functions-newC";

export const httpTrigger1Options: HttpTriggerOptions = { authLevel: 'anonymous' };
export const httpTrigger1Output: HttpOutputOptions = { name: 'res' };

export async function httpTrigger1(context: InvocationContext, req: HttpRequest): Promise<HttpResponse> {
    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    return {
        body: `Hello, ${name}!`
    };
};