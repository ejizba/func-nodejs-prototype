import { InvocationContext, QueueOptions } from "@azure/functions-option3";
import { MyQueueItem } from "../models/MyQueueItem";

export const processQueueMessageOptions: QueueOptions = {
    trigger: {
        name: 'myQueueItem',
        queueName: 'testQueue',
        connection: 'storage_APPSETTING'
    }
}

export async function processQueueMessage(context: InvocationContext, myQueueItem: MyQueueItem): Promise<void> {
    context.log('Queue trigger function processed work item', myQueueItem);
};