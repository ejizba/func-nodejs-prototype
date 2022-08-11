import { app, InvocationContext } from "@azure/functions";
import { MyQueueItem } from "../models/MyQueueItem";

async function processQueueMessage(context: InvocationContext, myQueueItem: MyQueueItem): Promise<void> {
    context.log('Queue trigger function processed work item', myQueueItem);
}

app.queue('processQueueMessage', {
    queueName: 'helloworldqueue',
    connection: 'storage_APPSETTING',
    handler: processQueueMessage
});
