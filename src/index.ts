import { app, HttpRequest, InvocationContext, output, Timer } from "@azure/functions";
import { MyQueueItem } from "./models/MyQueueItem";

// NOTE: This file and the code in the "functions" folder is the exact same code, just demonstrating different ways of organization
// You can switch which one is used by changing the "main" field in "package.json" to either "dist/src/functions/*.js" or "dist/src/index.js"

app.get('helloWorld', (context: InvocationContext, request: HttpRequest) => {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    return { body: `Hello, ${name}!` };
});

const queueOutput = output.queue({ queueName: 'helloworldqueue', connection: 'storage_APPSETTING' });
app.route('helloWorldQueue', {
    authLevel: "function",
    methods: ['get', 'put'],
    extraOutputs: [queueOutput],
    handler: (context: InvocationContext, request: HttpRequest) => {
        context.log(`RequestUrl=${request.url}`);

        const name = request.query.name || request.body || 'world';

        context.extraOutputs.set(queueOutput, { name });

        return { body: `Hello, ${name}!` };
    }
});

app.queue('processQueueMessage', {
    queueName: 'helloworldqueue',
    connection: 'storage_APPSETTING',
    handler: (context: InvocationContext, myQueueItem: MyQueueItem) => {
        context.log('Queue trigger function processed work item', myQueueItem);
    }
});

app.timer('snooze', {
    schedule: '0 */5 * * * *',
    handler: (context: InvocationContext, myTimer: Timer) => {
        var timeStamp = new Date().toISOString();
        context.log('The current time is: ', timeStamp);
    }
});
