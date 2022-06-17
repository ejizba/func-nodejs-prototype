import { app, HttpRequest, HttpResponse, InvocationContext } from "@azure/functions-newC";
import { httpMultipleOutputs } from "./functions/httpMultipleOutputs";
import { httpTrigger1, httpTrigger1Input, httpTrigger1Output } from "./functions/httpTrigger1";
import { queueTrigger1, queueTrigger1Input } from "./functions/queueTrigger1";
import { timerTrigger1 } from "./functions/timerTrigger1";

/**
 * The most basic http trigger
 */
app.addHttpFunction('HttpTrigger1', httpTrigger1Input, httpTrigger1)
    .addHttpOutput(httpTrigger1Output);

/**
 * The most basic timer trigger, with the trigger config in this file
 */
app.addTimerFunction('TimerTrigger1', { name: 'myTimer', schedule: '0 */5 * * * *', }, timerTrigger1);

/**
 * An http trigger with an extra output queue binding
 */
app.addHttpFunction('HttpMultipleOutputs', { name: 'req', authLevel: 'anonymous', }, httpMultipleOutputs)
    .addHttpOutput({ name: 'httpResponse' })
    .addQueueOutput({ name: 'queueOutput', queueName: 'testQueue', connection: 'storage_APPSETTING' });

/**
 * The most basic queue trigger
 */
app.addQueueFunction('QueueTrigger1', queueTrigger1Input, queueTrigger1);

/**
 * The most basic http trigger, except all code is put directly in this file
 */
app.addHttpFunction('HttpTriggerInline', { name: 'req', authLevel: 'anonymous', }, async function (context: InvocationContext, req: HttpRequest): Promise<HttpResponse> {
    context.log(`HTTP trigger function processed a request. RequestUrl=${req.url}`);

    const name = req.query.name || req.body?.name || 'world';
    return {
        // status: 200, /* Defaults to 200 */
        body: `Hello, ${name}!`
    };
}).addHttpOutput({ name: 'res' });
