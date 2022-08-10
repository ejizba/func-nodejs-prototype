import { HttpFunctionOptions, HttpRequest, HttpResponse, input, InvocationContext, output } from "@azure/functions";

const queueOutput = output.queue({ queueName: 'helloworldqueue', connection: 'storage_APPSETTING' });

export const helloWorldQueueOptions: HttpFunctionOptions = {
    trigger: input.http({ authLevel: "anonymous", methods: ["get", "post"] }),
    extraOutputs: [queueOutput]
}

export async function helloWorldQueue(context: InvocationContext, request: HttpRequest): Promise<HttpResponse> {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    context.extraOutputs.set(queueOutput, { name });

    return { body: `Hello, ${name}!` };
};