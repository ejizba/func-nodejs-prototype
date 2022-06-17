import { Binding, HttpInputBinding, HttpOutputBinding, HttpResponse, InvocationContext } from "@azure/functions-newB";

const reqBinding = new HttpInputBinding({
    authLevel: "anonymous",
    methods: [
        "get",
        "post"
    ]
});
const resBinding = new HttpOutputBinding();

export const httpTrigger1Bindings: Binding[] = [reqBinding, resBinding];

export async function httpTrigger1(context: InvocationContext): Promise<HttpResponse> {
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
};