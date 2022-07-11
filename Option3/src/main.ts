import { app, HttpRequest, HttpResponse, InvocationContext } from '@azure/functions-option3';
import { helloWorld } from './functions/helloWorld';
import { helloWorldQueue, httpOutputOptions } from './functions/helloWorldQueue';
import { processQueueMessage, processQueueMessageOptions } from './functions/processQueueMessage';
import { snooze } from './functions/snooze';

// Section A
app.get("/helloWorld", (context: InvocationContext, req: HttpRequest, res: HttpResponse) => {
    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    res.send(`Hello, ${name}!`);
});


// Section B
app.get("/helloWorld2", helloWorld);

app.registerHttpFunction("helloWorldQueue", httpOutputOptions, helloWorldQueue);

app.registerHttpFunction("helloWorld3", { trigger: { route: "/foo", methods: ["get"] } }, helloWorld);


// Section C
app.timer('0 */5 * * * *', snooze);

app.registerQueueFunction("processQueueMessage", processQueueMessageOptions, processQueueMessage);



