const { app } = require('@azure/functions');

if (process.env.storage_APPSETTING) {
    app.storageQueue('storageQueueTrigger1', {
        queueName: 'helloworldqueue',
        connection: 'storage_APPSETTING',
        handler: (queueItem, context) => {
            context.log('Storage queue function processed work item:', queueItem);
        }
    });
} else {
    console.warn('Skipping registration of "storageQueueTrigger1" because "storage_APPSETTING" is not defined');
}
