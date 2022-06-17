import { InvocationContext, QueueOptions } from "@azure/functions-newE";
import { MyQueueItem } from "src/models/MyQueueItem";

export const queueTrigger1Options: QueueOptions = {
    trigger: {
        name: 'myQueueItem',
        queueName: 'testQueue',
        connection: 'storage_APPSETTING'
    }
}

export async function queueTrigger1(context: InvocationContext, myQueueItem: MyQueueItem): Promise<void> {
    context.log('Queue trigger function processed work item', myQueueItem);
};