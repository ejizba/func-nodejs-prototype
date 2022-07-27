import { app, HttpFunctionOptions, HttpInput } from "@azure/functions";
import { helloWorld, helloWorldOptions } from "./functions/helloWorld";
import { helloWorldQueue, helloWorldQueueOptions } from "./functions/helloWorldQueue";
import { processQueueMessage, processQueueMessageOptions } from "./functions/processQueueMessage";
import { snooze, snoozeOptions } from "./functions/snooze";

app.addHttpFunction('helloWorld', helloWorldOptions, helloWorld);

app.addHttpFunction('helloWorldQueue', helloWorldQueueOptions, helloWorldQueue);

app.addQueueFunction('processQueueMessage', processQueueMessageOptions, processQueueMessage);

app.addTimerFunction('snooze', snoozeOptions, snooze);

const helloWorldInlineOptions: HttpFunctionOptions = {
    trigger: new HttpInput({ authLevel: "anonymous", methods: ["get", "post"] })
}

app.addHttpFunction('helloWorldInline', helloWorldInlineOptions, async (context, request) => {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    return { body: `Hello, ${name}!` };
})