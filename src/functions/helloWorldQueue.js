const { HttpInput, QueueOutput } = require('@azure/functions');

const queueOutput = new QueueOutput({ queueName: 'helloworldqueue', connection: 'storage_APPSETTING' });

const helloWorldQueueOptions = {
    trigger: new HttpInput({ authLevel: "anonymous", methods: ["get", "post"] }),
    extraOutputs: [queueOutput]
}

async function helloWorldQueue(context, request) {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    context.extraOutputs.set(queueOutput, { name });

    return { body: `Hello, ${name}!` };
};

module.exports = { helloWorldQueueOptions, helloWorldQueue };