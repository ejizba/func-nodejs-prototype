import { Binding, InvocationContext, QueueInputBinding } from "@azure/functions-option1";
import { MyQueueItem } from "../models/MyQueueItem";

const queueBinding = new QueueInputBinding({
    queueName: 'testQueue',
    connection: 'storage_APPSETTING'
});

export const processQueueMessageBindings: Binding[] = [queueBinding];

export async function processQueueMessage(context: InvocationContext): Promise<void> {
    const myQueueItem: MyQueueItem = queueBinding.get(context);
    context.log('Queue trigger function processed work item', myQueueItem);
};