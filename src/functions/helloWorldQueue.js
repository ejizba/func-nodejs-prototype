const { input, output } = require('@azure/functions');

const queueOutput = output.queue({ queueName: 'helloworldqueue', connection: 'storage_APPSETTING' });

const helloWorldQueueOptions = {
    trigger: input.http({ authLevel: "function" }),
    extraOutputs: [queueOutput]
}

async function helloWorldQueue(context, request) {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    context.extraOutputs.set(queueOutput, { name });

    return { body: `Hello, ${name}!` };
};

module.exports = { helloWorldQueueOptions, helloWorldQueue };