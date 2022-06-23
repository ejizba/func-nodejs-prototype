import { app, HttpRequest, HttpResponse, InvocationContext } from "@azure/functions-newC";
import { httpTrigger2 } from "./functions/httpTrigger2";
import { httpTrigger1, httpTrigger1Options, httpTrigger1Output } from "./functions/httpTrigger1";
import { queueTrigger1, queueTrigger1Options } from "./functions/queueTrigger1";
import { timerTrigger1 } from "./functions/timerTrigger1";

// Task 1a
// Read the following code and answer the questions below

app.addHttpFunction('HttpTriggerInline', { authLevel: 'anonymous', }, async function (context: InvocationContext, req: HttpRequest): Promise<HttpResponse> {
    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body?.name || 'world';
    return {
        // status: 200, /* Defaults to 200 */
        body: `Hello, ${name}!`
    };
}).addHttpOutput({ name: 'res' });

// How would you describe what the code is doing? 
// What do you think Line 18 is doing?

// Task 1b
// Explore the following functions
// What do they do?
// How do they compare with each other and to the one in Task 1a?
// [any code changes here? Ex change the name of queueOutput]

app.addHttpFunction('HttpTrigger1', httpTrigger1Options, httpTrigger1)
    .addHttpOutput(httpTrigger1Output);

app.addHttpFunction('HttpTrigger2', { authLevel: 'anonymous', }, httpTrigger2)
    .addHttpOutput({ name: 'httpResponse' })
    .addQueueOutput({ name: 'queueOutput', queueName: 'testQueue', connection: 'storage_APPSETTING' });


// Task 2
// Explore the following functions one by one.
// What do they do? 
app.addTimerFunction('TimerTrigger1', { schedule: '0 */5 * * * *', }, timerTrigger1);

app.addQueueFunction('QueueTrigger1', queueTrigger1Options, queueTrigger1);

