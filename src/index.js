const { app, input } = require('@azure/functions');
const { helloWorld, helloWorldOptions } = require('./functions/helloWorld');
const { helloWorldQueue, helloWorldQueueOptions } = require('./functions/helloWorldQueue');
const { processQueueMessage, processQueueMessageOptions } = require('./functions/processQueueMessage');
const { snooze, snoozeOptions } = require('./functions/snooze');

app.addHttpFunction('helloWorld', helloWorldOptions, helloWorld);

app.addHttpFunction('helloWorldQueue', helloWorldQueueOptions, helloWorldQueue);

app.addQueueFunction('processQueueMessage', processQueueMessageOptions, processQueueMessage);

app.addTimerFunction('snooze', snoozeOptions, snooze);

const helloWorldInlineOptions = {
    trigger: input.http({ authLevel: "anonymous", methods: ["get", "post"] })
}

app.addHttpFunction('helloWorldInline', helloWorldInlineOptions, async (context, request) => {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    return { body: `Hello, ${name}!` };
})