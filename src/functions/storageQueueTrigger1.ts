import { app, InvocationContext, trigger } from "@azure/functions";

export async function storageQueueTrigger1(context: InvocationContext, queueItem: unknown): Promise<void> {
    context.log('Storage queue function processed work item:', queueItem);
}

if (process.env.storage_APPSETTING) {
    app.generic('storageQueueTrigger1', {
        trigger: trigger.generic({
            type: 'queueTrigger',
            queueName: 'helloworldqueue',
            connection: 'storage_APPSETTING',
        }),
        handler: storageQueueTrigger1
    });
} else {
    console.warn('Skipping registration of "storageQueueTrigger1" because "storage_APPSETTING" is not defined');
}
