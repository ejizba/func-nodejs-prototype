import { app, HttpRequest, HttpResponse, InvocationContext } from "@azure/functions-newC";
import { httpMultipleOutputs } from "./functions/httpMultipleOutputs";
import { httpTrigger1, httpTrigger1Input, httpTrigger1Output } from "./functions/httpTrigger1";
import { timerTrigger1 } from "./functions/timerTrigger1";

/**
 * The most basic http trigger, where all the config and callback is in a separate file
 */
app.registerHttpFunction('HttpTrigger1', httpTrigger1Input, httpTrigger1)
    .registerHttpOutput(httpTrigger1Output);

/**
 * The most basic timer trigger, with the callback in a separate file
 */
app.registerTimerFunction('TimerTrigger1', { name: 'myTimer', schedule: '0 */5 * * * *', }, timerTrigger1);

/**
 * An http trigger with an extra output queue binding
 */
app.registerHttpFunction('HttpMultipleOutputs', { name: 'req', authLevel: 'anonymous', }, httpMultipleOutputs)
    .registerHttpOutput({ name: 'httpResponse' })
    .registerQueueOutput({ name: 'queueOutput', queueName: 'testQueue', connection: 'teststor_STORAGE' });

/**
 * The most basic http trigger, except all code is put directly in this file
 */
app.registerHttpFunction('HttpTriggerInline', { name: 'req', authLevel: 'anonymous', }, async function (context: InvocationContext, req: HttpRequest): Promise<HttpResponse> {
    context.log(`HTTP trigger function processed a request. RequestUrl=${req.url}`);

    const name = req.query.name || req.body?.name || 'world';
    return {
        // status: 200, /* Defaults to 200 */
        body: `Hello, ${name}!`
    };
}).registerHttpOutput({ name: 'res' });
