import { app, InvocationContext } from '@azure/functions';

export async function storageQueueTrigger1(queueItem: unknown, context: InvocationContext): Promise<void> {
    context.log('Storage queue function processed work item:', queueItem);
}

if (process.env.storage_APPSETTING) {
    app.storageQueue('storageQueueTrigger1', {
        queueName: 'helloworldqueue',
        connection: 'storage_APPSETTING',
        handler: storageQueueTrigger1,
    });
} else {
    console.warn('Skipping registration of "storageQueueTrigger1" because "storage_APPSETTING" is not defined');
}
