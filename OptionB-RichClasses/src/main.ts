import { app, HttpInputBinding, HttpOutputBinding, InvocationContext } from "@azure/functions-newB";
import { httpMultipleOutputs, httpMultipleOutputsBindings } from "./functions/httpMultipleOutputs";
import { httpTrigger1, httpTrigger1Bindings } from "./functions/httpTrigger1";
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
    context.log('HTTP trigger function processed a request.');
    const req = reqBinding.get(context);

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    resBinding.set(context, {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    });
})