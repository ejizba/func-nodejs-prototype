import { app, InvocationContext } from "@azure/functions";

export async function storageQueueTrigger1(context: InvocationContext, queueItem: unknown): Promise<void> {
    context.log('Storage queue function processed work item:', queueItem);
}

app.storageQueue('storageQueueTrigger1', {
    queueName: 'helloworldqueue',
    connection: 'storage_APPSETTING',
    handler: storageQueueTrigger1
});
