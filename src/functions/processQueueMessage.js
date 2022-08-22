const { app } = require('@azure/functions');

app.storageQueue('processQueueMessage', {
    queueName: 'helloworldqueue',
    connection: 'storage_APPSETTING',
    handler: async (context, myQueueItem) => {
        context.log('Queue trigger function processed work item', myQueueItem);
    }
});
