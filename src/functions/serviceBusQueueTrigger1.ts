import { app, InvocationContext } from "@azure/functions";

export async function serviceBusQueueTrigger1(context: InvocationContext, message: unknown): Promise<void> {
    context.log('Service bus queue function processed message', message);
}

app.serviceBusQueue('serviceBusQueueTrigger1', {
    connection: 'servicebus_APPSETTING',
    queueName: 'helloWorldQueue',
    handler: serviceBusQueueTrigger1
});