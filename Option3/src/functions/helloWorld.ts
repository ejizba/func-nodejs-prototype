import { HttpRequest, HttpResponse, InvocationContext } from "@azure/functions-option3";

export async function helloWorld(context: InvocationContext, req: HttpRequest, res: HttpResponse): Promise<void> {
    context.log(`HTTP trigger function processed a request. RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    res.send(`Hello, ${name}!`);
};