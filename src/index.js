const { app, input } = require('@azure/functions');
const { helloWorld, helloWorldOptions } = require('./functions/helloWorld');
const { helloWorldQueue, helloWorldQueueOptions } = require('./functions/helloWorldQueue');
const { processQueueMessage, processQueueMessageOptions } = require('./functions/processQueueMessage');
const { snooze, snoozeOptions } = require('./functions/snooze');

app.http('helloWorld', helloWorldOptions, helloWorld);

app.http('helloWorldQueue', helloWorldQueueOptions, helloWorldQueue);

app.queue('processQueueMessage', processQueueMessageOptions, processQueueMessage);

app.timer('snooze', snoozeOptions, snooze);

const helloWorldInlineOptions = {
    trigger: input.http({ authLevel: "anonymous", methods: ["get", "post"] })
}

app.http('helloWorldInline', helloWorldInlineOptions, async (context, request) => {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    return { body: `Hello, ${name}!` };
})