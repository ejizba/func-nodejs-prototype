import { app, InvocationContext, trigger } from "@azure/functions";

export async function serviceBusQueueTrigger1(message: unknown, context: InvocationContext): Promise<void> {
    context.log('Service bus queue function processed message:', message);
}

if (process.env.serviceBus_APPSETTING) {
    app.generic('serviceBusQueueTrigger1', {
        trigger: trigger.generic({
            type: 'serviceBusTrigger',
            connection: 'serviceBus_APPSETTING',
            queueName: 'helloWorldQueue',
        }),
        handler: serviceBusQueueTrigger1
    });
} else {
    console.warn('Skipping registration of "serviceBusQueueTrigger1" because "serviceBus_APPSETTING" is not defined');
}