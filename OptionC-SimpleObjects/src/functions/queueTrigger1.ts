import { InvocationContext, QueueInputBinding } from "@azure/functions-newC";
import { MyQueueItem } from "../models/MyQueueItem";

export const queueTrigger1Input: QueueInputBinding = {
    name: 'myQueueItem',
    queueName: 'testQueue',
    connection: 'storage_APPSETTING'
}

export async function queueTrigger1(context: InvocationContext, myQueueItem: MyQueueItem): Promise<void> {
    context.log('Queue trigger function processed work item', myQueueItem);
};