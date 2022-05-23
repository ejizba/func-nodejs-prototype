import { app, HttpInputBinding, HttpOutputBinding, InvocationContext } from "name@azure/functions-newB";

const reqBinding = new HttpInputBinding('req', {
    authLevel: "anonymous",
    methods: [
        "get",
        "post"
    ]
});
const resBinding = new HttpOutputBinding('res');

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