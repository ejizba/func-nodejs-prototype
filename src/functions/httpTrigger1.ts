import { FunctionContext, HttpCallback, HttpRequest, HttpResponse } from "@azure/functions-new";

export const httpTrigger1: HttpCallback = async function (context: FunctionContext, req: HttpRequest): Promise<HttpResponse> {
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