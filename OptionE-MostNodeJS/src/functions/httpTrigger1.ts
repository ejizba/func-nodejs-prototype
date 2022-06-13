import { Context, HttpRequest } from "@azure/functions";

export async function httpTrigger1(context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export const httpTrigger1Metadata = {
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
};