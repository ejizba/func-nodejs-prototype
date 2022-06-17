import { InvocationContext, QueueInputBinding } from "@azure/functions-newC";

export const queueTrigger1Input: QueueInputBinding = {
    name: 'myQueueItem',
    queueName: 'testQueue',
    connection: 'storage_APPSETTING'
}

export async function queueTrigger1(context: InvocationContext, myQueueItem: any): Promise<void> {
    context.log('Queue trigger function processed work item', myQueueItem);
};