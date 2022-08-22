import { app, HttpRequest, InvocationContext, output, Timer } from "@azure/functions";
import { MyQueueItem } from "./models/MyQueueItem";

// NOTE: This file and the code in the "functions" folder is the exact same code, just demonstrating different ways of organization
// You can switch which one is used by changing the "main" field in "package.json" to either "dist/src/functions/*.js" or "dist/src/index.js"

// A simple http trigger
app.get('helloWorld', async (context: InvocationContext, request: HttpRequest) => {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.get('name') || await request.text() || 'world';

    return { body: `Hello, ${name}!` };
});

// A more complex http trigger showing configuration options like:
// - How to change trigger settings (authLevel & methods)
// - How to add a secondary output to a storage queue
const queueOutput = output.storageQueue({ queueName: 'helloworldqueue', connection: 'storage_APPSETTING' });
app.http('helloWorldQueue', {
    authLevel: "function",
    methods: ['GET', 'POST'],
    extraOutputs: [queueOutput],
    handler: async (context: InvocationContext, request: HttpRequest) => {
        context.log(`RequestUrl=${request.url}`);

        const name = request.query.get('name') || await request.text() || 'world';

        context.extraOutputs.set(queueOutput, { name });

        return { body: `Hello, ${name}!` };
    }
});

// A simple timer trigger
app.timer('snooze', {
    schedule: '0 */5 * * * *',
    handler: (context: InvocationContext, myTimer: Timer) => {
        var timeStamp = new Date().toISOString();
        context.log('The current time is: ', timeStamp);
    }
});

// A simple storage queue trigger, triggered by the secondary output of `helloWorldQueue`
app.storageQueue('processQueueMessage', {
    queueName: 'helloworldqueue',
    connection: 'storage_APPSETTING',
    handler: (context: InvocationContext, myQueueItem: MyQueueItem) => {
        context.log('Queue trigger function processed work item', myQueueItem);
    }
});

// storage blob trigger
app.storageBlob('processBlob', {
    path: 'test123',
    connection: 'storage_APPSETTING',
    handler: (context: InvocationContext, blob: any) => {
        context.log('Blob trigger function processed work item', blob);
    }
});
