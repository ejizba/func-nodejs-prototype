import { app, HttpRequest, HttpResponse, InvocationContext } from "@azure/functions";

export async function helloWorld(context: InvocationContext, request: HttpRequest): Promise<HttpResponse> {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    return { body: `Hello, ${name}!` };
};

app.get('helloWorld', helloWorld);
