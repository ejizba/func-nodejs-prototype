import { app, HttpInputBinding, HttpOutputBinding, InvocationContext } from "@azure/functions-option1";
import { helloWorldQueue, helloWorldQueueBindings } from "./functions/helloWorldQueue";
import { processQueueMessage, processQueueMessageBindings } from "./functions/processQueueMessage";
import { reminder, reminderBindings } from "./functions/reminder";

// Section A
const reqBinding = new HttpInputBinding({
    authLevel: "anonymous",
    methods: [
        "get",
        "post"
    ]
});

const resBinding = new HttpOutputBinding();

app.registerFunction('helloWorld', [reqBinding, resBinding], async function (context: InvocationContext): Promise<void> {
    const req = reqBinding.get(context);

    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';

    resBinding.set(context, {
        body: `Hello, ${name}!`
    });
})


// Section B
app.registerFunction('helloWorldQueue', helloWorldQueueBindings, helloWorldQueue);


// Section C
app.registerFunction('reminder', reminderBindings, reminder);

app.registerFunction('processQueueMessage', processQueueMessageBindings, processQueueMessage);


