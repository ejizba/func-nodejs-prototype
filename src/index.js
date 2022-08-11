const { app, output } = require('@azure/functions');

// NOTE: This file and the code in the "functions" folder is the exact same code, just demonstrating different ways of organization
// You can switch which one is used by changing the "main" field in "package.json" to either "src/functions/*.js" or "src/index.js"

app.get('helloWorld', async (context, request) => {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    return { body: `Hello, ${name}!` };
});

const queueOutput = output.queue({ queueName: 'helloworldqueue', connection: 'storage_APPSETTING' });
app.get('helloWorldQueue', {
    authLevel: "function",
    methods: ["get", "put"],
    extraOutputs: [queueOutput],
    handler: async (context, request) => {
        context.log(`RequestUrl=${request.url}`);

        const name = request.query.name || request.body || 'world';

        context.extraOutputs.set(queueOutput, { name });

        return { body: `Hello, ${name}!` };
    }
});

app.queue('processQueueMessage', {
    queueName: 'helloworldqueue',
    connection: 'storage_APPSETTING',
    handler: async (context, myQueueItem) => {
        context.log('Queue trigger function processed work item', myQueueItem);
    }
});

app.timer('snooze', {
    schedule: '0 */5 * * * *',
    handler: async (context, myTimer) => {
        var timeStamp = new Date().toISOString();
        context.log('The current time is: ', timeStamp);
    }
});