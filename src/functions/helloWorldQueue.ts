import { app, HttpRequest, HttpResponse, InvocationContext, output } from "@azure/functions";

const queueOutput = output.storageQueue({ queueName: 'helloworldqueue', connection: 'storage_APPSETTING' });

async function helloWorldQueue(context: InvocationContext, request: HttpRequest): Promise<HttpResponse> {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.get('name') || await request.text() || 'world';

    context.extraOutputs.set(queueOutput, { name });

    return { body: `Hello, ${name}!` };
};

app.http('helloWorldQueue', {
    authLevel: "function",
    methods: ['GET', 'POST'],
    extraOutputs: [queueOutput],
    handler: helloWorldQueue
});
