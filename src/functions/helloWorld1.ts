import { app, HttpRequest, HttpResponse, InvocationContext } from "@azure/functions";

export async function helloWorld1(context: InvocationContext, request: HttpRequest): Promise<HttpResponse> {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.get('name') || await request.text() || 'world';

    return { body: `Hello, ${name}!` };
};

app.get('helloWorld1', helloWorld1);
