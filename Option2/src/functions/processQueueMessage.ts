import { InvocationContext, QueueTriggerOptions } from "@azure/functions-option2";
import { MyQueueItem } from "../models/MyQueueItem";

export const processQueueMessageOptions: QueueTriggerOptions = {
    queueName: 'testQueue',
    connection: 'storage_APPSETTING'
}

export async function processQueueMessage(context: InvocationContext, myQueueItem: MyQueueItem): Promise<void> {
    context.log('Function processed work item', myQueueItem);
};