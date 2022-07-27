import { InvocationContext, QueueFunctionOptions, QueueInput } from "@azure/functions";
import { MyQueueItem } from "../models/MyQueueItem";

export const processQueueMessageOptions: QueueFunctionOptions = {
    trigger: new QueueInput({ queueName: 'helloworldqueue', connection: 'storage_APPSETTING' })
}

export async function processQueueMessage(context: InvocationContext, myQueueItem: MyQueueItem): Promise<void> {
    context.log('Queue trigger function processed work item', myQueueItem);
};