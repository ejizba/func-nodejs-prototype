import { HttpFunctionOptions, HttpInput, HttpRequest, HttpResponse, InvocationContext } from "@azure/functions";

export const helloWorldOptions: HttpFunctionOptions = {
    trigger: new HttpInput({ authLevel: "anonymous", methods: ["get", "post"] })
}

export async function helloWorld(context: InvocationContext, request: HttpRequest): Promise<HttpResponse> {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    return { body: `Hello, ${name}!` };
};