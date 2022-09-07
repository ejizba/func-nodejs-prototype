import { app, InvocationContext, trigger } from "@azure/functions";

export async function eventHubTrigger1(context: InvocationContext, messages: unknown): Promise<void> {
    if (Array.isArray(messages)) {
        context.log(`Event hub function processed ${messages.length} messages`);
        for (const message of messages) {
            context.log('Event hub message:', message);
        }
    } else {
        context.log('Event hub function processed message:', messages);
    }
}

if (process.env.eventHub_APPSETTING) {
    app.generic('eventHubTrigger1', {
        trigger: trigger.generic({
            type: 'eventHubTrigger',
            connection: 'eventHub_APPSETTING',
            eventHubName: 'helloWorldHub',
            cardinality: 'many',
        }),
        handler: eventHubTrigger1
    });
} else {
    console.warn('Skipping registration of "eventHubTrigger1" because "eventHub_APPSETTING" is not defined');
}