import { app, HttpFunctionOptions, HttpRequest, HttpResponse, input, InvocationContext, output } from "@azure/functions";

const queueOutput = output.queue({ queueName: 'helloworldqueue', connection: 'storage_APPSETTING' });

const helloWorldQueueOptions: HttpFunctionOptions = {
    trigger: input.http({ authLevel: "function" }),
    extraOutputs: [queueOutput]
}

async function helloWorldQueue(context: InvocationContext, request: HttpRequest): Promise<HttpResponse> {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    context.extraOutputs.set(queueOutput, { name });

    return { body: `Hello, ${name}!` };
};

app.get('helloWorldQueue', helloWorldQueue, helloWorldQueueOptions);
