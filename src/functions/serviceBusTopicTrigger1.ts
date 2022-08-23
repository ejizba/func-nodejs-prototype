import { app, InvocationContext } from "@azure/functions";

export async function serviceBusTopicTrigger1(context: InvocationContext, message: unknown): Promise<void> {
    context.log('Service bus topic function processed message', message);
}

app.serviceBusTopic('serviceBusTopicTrigger1', {
    connection: 'servicebus_APPSETTING',
    topicName: 'helloWorldTopic',
    subscriptionName: 'helloWorldSub',
    handler: serviceBusTopicTrigger1
});