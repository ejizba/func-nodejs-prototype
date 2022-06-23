import { Binding, HttpResponse, InvocationContext, QueueInputBinding } from "@azure/functions-newB";
import { MyQueueItem } from "../models/MyQueueItem";

const queueBinding = new QueueInputBinding({
    queueName: 'testQueue',
    connection: 'storage_APPSETTING'
});

export const queueTrigger1Bindings: Binding[] = [queueBinding];

export async function queueTrigger1(context: InvocationContext): Promise<HttpResponse> {
    const myQueueItem: MyQueueItem = queueBinding.get(context);
    context.log('Queue trigger function processed work item', myQueueItem);
};