import { app, InvocationContext } from '@azure/functions';

export async function eventHubTrigger1(context: InvocationContext, messages: unknown | unknown[]): Promise<void> {
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
    app.eventHub('eventHubTrigger1', {
        connection: 'eventHub_APPSETTING',
        eventHubName: 'helloWorldHub',
        cardinality: 'many',
        handler: eventHubTrigger1,
    });
} else {
    console.warn('Skipping registration of "eventHubTrigger1" because "eventHub_APPSETTING" is not defined');
}
