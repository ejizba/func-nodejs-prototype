import { HttpRequest, HttpResponse, InvocationContext } from "@azure/functions-newE";

export async function httpTrigger1(context: InvocationContext, req: HttpRequest, res: HttpResponse): Promise<void> {
    context.log(`HTTP trigger function processed a request. RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    res.send(`Hello, ${name}!`);
};