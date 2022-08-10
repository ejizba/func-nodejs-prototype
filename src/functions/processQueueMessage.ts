import { app, input, InvocationContext } from "@azure/functions";
import { MyQueueItem } from "../models/MyQueueItem";

app.queue('processQueueMessage', async (context: InvocationContext, myQueueItem: MyQueueItem) => {
    context.log('Queue trigger function processed work item', myQueueItem);
}, {
    trigger: input.queue({ queueName: 'helloworldqueue', connection: 'storage_APPSETTING' })
});
