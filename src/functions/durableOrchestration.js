const { app } = require('@azure/functions');
const df = require('durable-functions');

// Replace with the name of your Durable Functions Activity
const activityName = 'hello';

df.app.orchestration('durableOrchestrator1', function* (context) {
    const outputs = [];
    outputs.push(yield context.df.callActivity(activityName, 'Tokyo'));
    outputs.push(yield context.df.callActivity(activityName, 'Seattle'));
    outputs.push(yield context.df.callActivity(activityName, 'Cairo'));

    return outputs;
});

df.app.activity(activityName, {
    handler: (input) => {
        return `Hello, ${input}`;
    },
});

app.http('durableOrchestrationStart1', {
    route: 'orchestrators/{orchestratorName}',
    extraInputs: [df.input.durableClient()],
    handler: async (request, context) => {
        const client = df.getClient(context);
        const body = await request.text();
        const instanceId = await client.startNew(request.params.orchestratorName, { input: body });

        context.log(`Started orchestration with ID = '${instanceId}'.`);

        return client.createCheckStatusResponse(request, instanceId);
    },
});
