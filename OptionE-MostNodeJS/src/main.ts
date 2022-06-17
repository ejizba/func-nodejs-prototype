import { app, HttpRequest, HttpResponse, InvocationContext } from '@azure/functions-newE';
import { httpMultipleOutputOptions, httpMultipleOutputs } from './functions/httpMultipleOutputs';
import { httpTrigger1 } from './functions/httpTrigger1';
import { queueTrigger1, queueTrigger1Options } from './functions/queueTrigger1';
import { timerTrigger1 } from './functions/timerTrigger1';

/**
 * The simplest, most-opionated example for an http trigger
 */
app.get("/HttpTrigger1", httpTrigger1);

/**
 * A variation on the above http trigger where you override the default configuration
 */
app.registerHttpFunction("HttpConfigOverride", { trigger: { route: "/foo", methods: ["get"] } }, httpTrigger1);

/**
 * The simplest, most-opionated example for a timer trigger
 */
app.timer('0 */5 * * * *', timerTrigger1);

/**
 * An http trigger with an extra output queue binding
 */
app.registerHttpFunction("HttpMultipleOutputs", httpMultipleOutputOptions, httpMultipleOutputs);

/**
 * The most basic queue trigger, where all the config and callback is in a separate file
 */
app.registerQueueFunction("QueueTrigger1", queueTrigger1Options, queueTrigger1);

/**
 * The most basic http trigger, except all code is put directly in this file
 */
app.get("/HttpTriggerInline", (context: InvocationContext, req: HttpRequest, res: HttpResponse) => {
    context.log(`HTTP trigger function processed a request. RequestUrl=${req.url}`);

    const name = req.query.name || req.body?.name || 'world';
    res.send(`Hello, ${name}!`);
});
