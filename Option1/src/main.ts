import { app, HttpInputBinding, HttpOutputBinding, InvocationContext } from "@azure/functions-option1";
import { httpTrigger2, httpTriggerBindings } from "./functions/httpTrigger2";
import { queueTrigger1, queueTrigger1Bindings } from "./functions/queueTrigger1";
import { timerTrigger1, timerTrigger1Bindings } from "./functions/timerTrigger1";

// Section A
const reqBinding = new HttpInputBinding({
    authLevel: "anonymous",
    methods: [
        "get",
        "post"
    ]
});

const resBinding = new HttpOutputBinding();

app.registerFunction('HttpTrigger1', [reqBinding, resBinding], async function (context: InvocationContext): Promise<void> {
    const req = reqBinding.get(context);

    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';

    resBinding.set(context, {
        body: `Hello, ${name}!`
    });
})


// Section B
app.registerFunction('HttpTrigger2', httpTriggerBindings, httpTrigger2);


// Section C
app.registerFunction('TimerTrigger1', timerTrigger1Bindings, timerTrigger1);

app.registerFunction('QueueTrigger1', queueTrigger1Bindings, queueTrigger1);


