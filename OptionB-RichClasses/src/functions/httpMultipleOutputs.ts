import { Binding, HttpInputBinding, HttpOutputBinding, HttpResponse, InvocationContext, QueueOutputBinding } from "@azure/functions-newB";

const reqBinding = new HttpInputBinding({
    authLevel: "anonymous",
    methods: [
        "get",
        "post"
    ]
});
const resBinding = new HttpOutputBinding();
const queueBinding = new QueueOutputBinding({
    queueName: 'testQueue',
    connection: 'teststor_STORAGE'
});

export const httpMultipleOutputsBindings: Binding[] = [reqBinding, resBinding, queueBinding];

export async function httpMultipleOutputs(context: InvocationContext): Promise<HttpResponse> {
    const msg = 'Hello, world!';

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
    queueBinding.set(context, responseMessage);
};