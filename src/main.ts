import { app, HttpRequest, HttpResponse, InvocationContext } from "@azure/functions-new";
import { httpMultipleOutputs } from "./functions/httpMultipleOutputs";
import { httpTrigger1 } from "./functions/httpTrigger1";
import { timerTrigger1 } from "./functions/timerTrigger1";

app.registerHttpFunction('HttpTrigger1', { name: 'req', authLevel: 'anonymous' }, httpTrigger1)
    .registerHttpOutput({ name: 'res' });

app.registerTimerFunction('TimerTrigger1', { name: 'myTimer', schedule: '0 */5 * * * *', }, timerTrigger1);

app.registerHttpFunction('HttpMultipleOutputs', { name: 'req', authLevel: 'anonymous', }, httpMultipleOutputs)
    .registerHttpOutput({ name: 'httpResponse' })
    .registerQueueOutput({ name: 'queueOutput', queueName: 'testQueue', connection: 'teststor_STORAGE' });

app.registerHttpFunction('HttpTriggerInline', { name: 'req', authLevel: 'anonymous', }, async function (context: InvocationContext, req: HttpRequest): Promise<HttpResponse> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    return {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}).registerHttpOutput({ name: 'res' });
