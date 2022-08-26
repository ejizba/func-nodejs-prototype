import { app, InvocationContext } from "@azure/functions";

export async function serviceBusQueueTrigger1(context: InvocationContext, message: unknown): Promise<void> {
    context.log('Service bus queue function processed message:', message);
}

if (process.env.serviceBus_APPSETTING) {
    app.serviceBusQueue('serviceBusQueueTrigger1', {
        connection: 'serviceBus_APPSETTING',
        queueName: 'helloWorldQueue',
        handler: serviceBusQueueTrigger1
    });
} else {
    console.warn('Skipping registration of "serviceBusQueueTrigger1" because "serviceBus_APPSETTING" is not defined');
}