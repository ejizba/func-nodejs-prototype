import { QueueInput } from "@azure/functions";

export const processQueueMessageOptions = {
    trigger: new QueueInput({ queueName: 'helloworldqueue', connection: 'storage_APPSETTING' })
}

export async function processQueueMessage(context, myQueueItem) {
    context.log('Queue trigger function processed work item', myQueueItem);
};