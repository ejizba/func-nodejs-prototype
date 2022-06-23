import { InvocationContext, QueueTriggerOptions } from "@azure/functions-newC";
import { MyQueueItem } from "../models/MyQueueItem";

export const queueTrigger1Options: QueueTriggerOptions = {
    queueName: 'testQueue',
    connection: 'storage_APPSETTING'
}

export async function queueTrigger1(context: InvocationContext, myQueueItem: MyQueueItem): Promise<void> {
    context.log('Function processed work item', myQueueItem);
};