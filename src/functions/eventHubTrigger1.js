const { app } = require('@azure/functions');

if (process.env.eventHub_APPSETTING) {
    app.eventHub('eventHubTrigger1', {
        connection: 'eventHub_APPSETTING',
        eventHubName: 'helloWorldHub',
        cardinality: 'many',
        handler: (messages, context) => {
            if (Array.isArray(messages)) {
                context.log(`Event hub function processed ${messages.length} messages`);
                for (const message of messages) {
                    context.log('Event hub message:', message);
                }
            } else {
                context.log('Event hub function processed message:', messages);
            }
        }
    });
} else {
    console.warn('Skipping registration of "eventHubTrigger1" because "eventHub_APPSETTING" is not defined');
}