import { app, HttpRequest, HttpResponse, InvocationContext } from "@azure/functions-option2";
import { helloWorld, helloWorldOptions, helloWorldOutput } from "./functions/helloWorld";
import { helloWorldQueue } from "./functions/helloWorldQueue";
import { processQueueMessage, processQueueMessageOptions } from "./functions/processQueueMessage";
import { reminder } from "./functions/reminder";

// Section A
app.addHttpFunction('helloWorld', { authLevel: 'anonymous', }, async function (context: InvocationContext, req: HttpRequest): Promise<HttpResponse> {
    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    return {
        body: `Hello, ${name}!`
    };
}).addHttpOutput({ name: 'res' });


// Section B
app.addHttpFunction('helloWorld2', helloWorldOptions, helloWorld)
    .addHttpOutput(helloWorldOutput);

app.addHttpFunction('helloWorldQueue', { authLevel: 'anonymous', }, helloWorldQueue)
    .addHttpOutput({ name: 'httpResponse' })
    .addQueueOutput({ name: 'queueOutput', queueName: 'testQueue', connection: 'storage_APPSETTING' });


// Section C
app.addTimerFunction('reminder', { schedule: '0 */5 * * * *', }, reminder);

app.addQueueFunction('processQueueMessage', processQueueMessageOptions, processQueueMessage);
