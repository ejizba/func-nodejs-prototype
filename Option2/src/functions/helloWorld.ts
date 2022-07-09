import { HttpOutputOptions, HttpRequest, HttpResponse, HttpTriggerOptions, InvocationContext } from "@azure/functions-option2";

export const helloWorldOptions: HttpTriggerOptions = { authLevel: 'anonymous' };
export const helloWorldOutput: HttpOutputOptions = { name: 'res' };

export async function helloWorld(context: InvocationContext, req: HttpRequest): Promise<HttpResponse> {
    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    return {
        body: `Hello, ${name}!`
    };
};