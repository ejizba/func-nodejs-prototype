const { app } = require('@azure/functions');
const { helloWorld } = require('./functions/helloWorld');
const { helloWorldQueue, helloWorldQueueOptions } = require('./functions/helloWorldQueue');
const { processQueueMessage, processQueueMessageOptions } = require('./functions/processQueueMessage');
const { snooze, snoozeOptions } = require('./functions/snooze');

app.get('helloWorld', helloWorld);

app.get('helloWorldQueue', helloWorldQueue, helloWorldQueueOptions);

app.queue('processQueueMessage', processQueueMessage, processQueueMessageOptions);

app.timer('snooze', snooze, snoozeOptions);

app.get('helloWorldInline', async (context, request) => {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    return { body: `Hello, ${name}!` };
});