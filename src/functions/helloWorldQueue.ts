import { app, HttpRequest, HttpResponse, InvocationContext, output } from "@azure/functions";

const queueOutput = output.queue({ queueName: 'helloworldqueue', connection: 'storage_APPSETTING' });

async function helloWorldQueue(context: InvocationContext, request: HttpRequest): Promise<HttpResponse> {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    context.extraOutputs.set(queueOutput, { name });

    return { body: `Hello, ${name}!` };
};

app.route('helloWorldQueue', {
    authLevel: "function",
    methods: ['get', 'put'],
    extraOutputs: [queueOutput],
    handler: helloWorldQueue
});
