import { HttpInputBinding, HttpOutputBinding, HttpRequest, HttpResponse, InvocationContext } from "@azure/functions-newC";

export const httpTrigger1Input: HttpInputBinding = { name: 'req', authLevel: 'anonymous' };
export const httpTrigger1Output: HttpOutputBinding = { name: 'res' };

export async function httpTrigger1(context: InvocationContext, req: HttpRequest): Promise<HttpResponse> {
    context.log(`HTTP trigger function processed a request. RequestUrl=${req.url}`);

    const name = req.query.name || req.body?.name || 'world';
    return {
        // status: 200, /* Defaults to 200 */
        body: `Hello, ${name}!`
    };
};