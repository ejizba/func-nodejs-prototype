import { app, HttpRequest, HttpResponse, InvocationContext, output, trigger } from "@azure/functions";

export async function helloWorld1(context: InvocationContext, request: HttpRequest): Promise<HttpResponse> {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || await request.text() || 'world';

    return { body: `Hello, ${name}!` };
};

app.generic('helloWorld1', {
    trigger: trigger.generic({
        type: 'httpTrigger',
        methods: ['GET', 'POST']
    }),
    return: output.generic({
        type: 'http'
    }),
    handler: helloWorld1
});
