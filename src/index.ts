import { app } from "@azure/functions";
import { helloWorld } from "./functions/helloWorld";
import { helloWorldQueue, helloWorldQueueOptions } from "./functions/helloWorldQueue";
import { processQueueMessage, processQueueMessageOptions } from "./functions/processQueueMessage";
import { snooze, snoozeOptions } from "./functions/snooze";

app.get('helloWorld', helloWorld);

app.get('helloWorldQueue', helloWorldQueue, helloWorldQueueOptions);

app.queue('processQueueMessage', processQueueMessage, processQueueMessageOptions);

app.timer('snooze', snooze, snoozeOptions);

app.get('helloWorldInline', async (context, request) => {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    return { body: `Hello, ${name}!` };
});