import { HttpFunctionOptions, HttpInput, HttpRequest, HttpResponse, InvocationContext, QueueOutput } from "@azure/functions";

const queueOutput = new QueueOutput({ queueName: 'helloworldqueue', connection: 'storage_APPSETTING' });

export const helloWorldQueueOptions: HttpFunctionOptions = {
    trigger: new HttpInput({ authLevel: "anonymous", methods: ["get", "post"] }),
    extraOutputs: [queueOutput]
}

export async function helloWorldQueue(context: InvocationContext, request: HttpRequest): Promise<HttpResponse> {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    context.extraOutputs.set(queueOutput, { name });

    return { body: `Hello, ${name}!` };
};