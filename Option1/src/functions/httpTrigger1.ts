import { HttpRequest, HttpResponse, InvocationContext } from "@azure/functions-new1";

export async function httpTrigger1(context: InvocationContext, req: HttpRequest): Promise<HttpResponse> {
    context.log('HTTP trigger function processed a request.');
    const name = req.query.name || req.body?.name;
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    return {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
};