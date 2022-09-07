import { app, InvocationContext, trigger } from "@azure/functions";

export async function serviceBusTopicTrigger1(context: InvocationContext, message: unknown): Promise<void> {
    context.log('Service bus topic function processed message:', message);
}

if (process.env.serviceBus_APPSETTING) {
    app.generic('serviceBusTopicTrigger1', {
        trigger: trigger.generic({
            type: 'serviceBusTrigger',
            connection: 'serviceBus_APPSETTING',
            topicName: 'helloWorldTopic',
            subscriptionName: 'helloWorldSub',
        }),
        handler: serviceBusTopicTrigger1
    });
} else {
    console.warn('Skipping registration of "serviceBusTopicTrigger1" because "serviceBus_APPSETTING" is not defined');
}