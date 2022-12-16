const { app } = require('@azure/functions');

if (process.env.serviceBus_APPSETTING) {
    app.serviceBusQueue('serviceBusQueueTrigger1', {
        connection: 'serviceBus_APPSETTING',
        queueName: 'helloWorldQueue',
        handler: (message, context) => {
            context.log('Service bus queue function processed message:', message);
        }
    });
} else {
    console.warn('Skipping registration of "serviceBusQueueTrigger1" because "serviceBus_APPSETTING" is not defined');
}