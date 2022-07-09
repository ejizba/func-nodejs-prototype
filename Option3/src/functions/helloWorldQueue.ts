import { HttpOptions, HttpRequest, HttpResponse, InvocationContext } from "@azure/functions-option3";

export const httpOutputOptions: HttpOptions = {
    outputBindings: [
        { name: 'queueOutput', queueName: 'testQueue', connection: 'storage_APPSETTING' }
    ]
}

export async function helloWorldQueue(context: InvocationContext, req: HttpRequest, res: HttpResponse): Promise<any> {
    context.log(`HTTP trigger function processed a request. RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    context.outputBindings.queueOutput = { name };
    res.send(`Hello, ${name}!`);
};