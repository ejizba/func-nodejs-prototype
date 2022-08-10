import { HttpInput, QueueOutput } from "@azure/functions";

const queueOutput = new QueueOutput({ queueName: 'helloworldqueue', connection: 'storage_APPSETTING' });

export const helloWorldQueueOptions = {
    trigger: new HttpInput({ authLevel: "anonymous", methods: ["get", "post"] }),
    extraOutputs: [queueOutput]
}

export async function helloWorldQueue(context, request) {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    context.extraOutputs.set(queueOutput, { name });

    return { body: `Hello, ${name}!` };
};