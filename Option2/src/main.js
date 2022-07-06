import { app, HttpRequest, HttpResponse, InvocationContext } from "@azure/functions-newC";
import { httpTrigger1, httpTrigger1Options, httpTrigger1Output } from "./functions/httpTrigger1";
import { httpTrigger2 } from "./functions/httpTrigger2";
import { queueTrigger1, queueTrigger1Options } from "./functions/queueTrigger1";
import { timerTrigger1 } from "./functions/timerTrigger1";

// 1a
app.addHttpFunction('HttpTriggerInline', { authLevel: 'anonymous', }, async function (context: InvocationContext, req: HttpRequest): Promise<HttpResponse> {
    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    return {
        body: `Hello, ${name}!`
    };
}).addHttpOutput({ name: 'res' });


// 1b
app.addHttpFunction('HttpTrigger1', httpTrigger1Options, httpTrigger1)
    .addHttpOutput(httpTrigger1Output);

app.addHttpFunction('HttpTrigger2', { authLevel: 'anonymous', }, httpTrigger2)
    .addHttpOutput({ name: 'httpResponse' })
    .addQueueOutput({ name: 'queueOutput', queueName: 'testQueue', connection: 'storage_APPSETTING' });


// 1c
app.addTimerFunction('TimerTrigger1', { schedule: '0 */5 * * * *', }, timerTrigger1);

app.addQueueFunction('QueueTrigger1', queueTrigger1Options, queueTrigger1);
