const { app } = require('@azure/functions');

if (process.env.serviceBus_APPSETTING) {
    app.serviceBusTopic('serviceBusTopicTrigger1', {
        connection: 'serviceBus_APPSETTING',
        topicName: 'helloWorldTopic',
        subscriptionName: 'helloWorldSub',
        handler: (context, message) => {
            context.log('Service bus topic function processed message:', message);
        }
    });
} else {
    console.warn('Skipping registration of "serviceBusTopicTrigger1" because "serviceBus_APPSETTING" is not defined');
}