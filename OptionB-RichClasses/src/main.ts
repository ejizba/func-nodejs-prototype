import { app, HttpInputBinding, HttpOutputBinding, InvocationContext } from "@azure/functions-newB";
import { httpMultipleOutputs, httpMultipleOutputsBindings } from "./functions/httpMultipleOutputs";
import { httpTrigger1, httpTrigger1Bindings } from "./functions/httpTrigger1";
import { queueTrigger1, queueTrigger1Bindings } from "./functions/queueTrigger1";
import { timerTrigger1, timerTrigger1Bindings } from "./functions/timerTrigger1";

/**
 * The most basic http trigger, where all the config and callback is in a separate file
 */
app.registerFunction('HttpTrigger1', httpTrigger1Bindings, httpTrigger1);

/**
 * The most basic timer trigger, where all the config and callback is in a separate file
 */
app.registerFunction('TimerTrigger1', timerTrigger1Bindings, timerTrigger1);

/**
 * An http trigger with an extra output queue binding
 */
app.registerFunction('HttpMultipleOutputs', httpMultipleOutputsBindings, httpMultipleOutputs);

/**
 * The most basic queue trigger, where all the config and callback is in a separate file
 */
app.registerFunction('QueueTrigger1', queueTrigger1Bindings, queueTrigger1);

const reqBinding = new HttpInputBinding({
    authLevel: "anonymous",
    methods: [
        "get",
        "post"
    ]
});
const resBinding = new HttpOutputBinding();

/**
 * The most basic http trigger, except all code is put directly in this file
 */
app.registerFunction('HttpTriggerInline', [reqBinding, resBinding], async function (context: InvocationContext): Promise<void> {
    const req = reqBinding.get(context);

    context.log(`HTTP trigger function processed a request. RequestUrl=${req.url}`);

    const name = req.query.name || req.body?.name || 'world';
    resBinding.set(context, {
        // status: 200, /* Defaults to 200 */
        body: `Hello, ${name}!`
    });
})