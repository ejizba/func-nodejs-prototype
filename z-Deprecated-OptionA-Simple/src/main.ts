import { Context, HttpRequest } from '@azure/functions';
import { registerFunction } from '@azure/functions-core';
import { httpMultipleOutputs, httpMultipleOutputsMetadata } from "./functions/httpMultipleOutputs";
import { httpTrigger1, httpTrigger1Metadata } from "./functions/httpTrigger1";
import { timerTrigger1, timerTrigger1Metadata } from "./functions/timerTrigger1";

registerFunction('HttpTrigger1', httpTrigger1Metadata, httpTrigger1)

registerFunction('TimerTrigger1', timerTrigger1Metadata, timerTrigger1);

registerFunction('HttpMultipleOutputs', httpMultipleOutputsMetadata, httpMultipleOutputs);

registerFunction('HttpTriggerInline', {
    bindings: [
        {
            authLevel: "anonymous",
            type: "httpTrigger",
            direction: "in",
            name: "req",
            methods: [
                "get",
                "post"
            ]
        },
        {
            type: "http",
            direction: "out",
            name: "res"
        }
    ]
}, async (context: Context, req: HttpRequest) => {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
});
