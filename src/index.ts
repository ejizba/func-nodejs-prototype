import { app, HttpFunctionOptions, input } from "@azure/functions";
import { helloWorld, helloWorldOptions } from "./functions/helloWorld";
import { helloWorldQueue, helloWorldQueueOptions } from "./functions/helloWorldQueue";
import { processQueueMessage, processQueueMessageOptions } from "./functions/processQueueMessage";
import { snooze, snoozeOptions } from "./functions/snooze";

app.http('helloWorld', helloWorldOptions, helloWorld);

app.http('helloWorldQueue', helloWorldQueueOptions, helloWorldQueue);

app.queue('processQueueMessage', processQueueMessageOptions, processQueueMessage);

app.timer('snooze', snoozeOptions, snooze);

const helloWorldInlineOptions: HttpFunctionOptions = {
    trigger: input.http({ authLevel: "anonymous", methods: ["get", "post"] })
}

app.http('helloWorldInline', helloWorldInlineOptions, async (context, request) => {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    return { body: `Hello, ${name}!` };
})