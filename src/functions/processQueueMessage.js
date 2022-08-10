const { app } = require('@azure/functions');

app.queue('processQueueMessage', {
    trigger: { queueName: 'helloworldqueue', connection: 'storage_APPSETTING' },
    handler: async (context, myQueueItem) => {
        context.log('Queue trigger function processed work item', myQueueItem);
    }
});
