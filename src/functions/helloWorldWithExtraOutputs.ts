import { app, HttpRequest, HttpResponse, InvocationContext, output } from '@azure/functions';

const queueOutput = output.storageQueue({
    queueName: 'helloworldqueue',
    connection: 'storage_APPSETTING',
});
const blobOutput = output.storageBlob({
    connection: 'storage_APPSETTING',
    path: 'helloworldcontainer/hello-at-{DateTime}',
});
const cosmosDBOutput = output.cosmosDB({
    connectionStringSetting: 'cosmosDB_APPSETTING',
    databaseName: 'helloWorldDB',
    collectionName: 'helloWorldCol',
    partitionKey: '/id',
});
const serviceBusQueueOutput = output.serviceBusQueue({
    connection: 'serviceBus_APPSETTING',
    queueName: 'helloWorldQueue',
});
const serviceBusTopicOutput = output.serviceBusTopic({
    connection: 'serviceBus_APPSETTING',
    topicName: 'helloWorldTopic',
});
const eventHubOutput = output.eventHub({
    connection: 'eventHub_APPSETTING',
    eventHubName: 'helloWorldHub',
});
async function helloWorldWithExtraOutputs(context: InvocationContext, request: HttpRequest): Promise<HttpResponse> {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || (await request.text()) || 'world';

    if (process.env.storage_APPSETTING) {
        context.extraOutputs.set(queueOutput, { name });
        context.extraOutputs.set(blobOutput, { name });
    }
    if (process.env.cosmosDB_APPSETTING) {
        context.extraOutputs.set(cosmosDBOutput, [{ name }]);
    }
    if (process.env.serviceBus_APPSETTING) {
        context.extraOutputs.set(serviceBusQueueOutput, { name });
        context.extraOutputs.set(serviceBusTopicOutput, { name });
    }
    if (process.env.eventHub_APPSETTING) {
        context.extraOutputs.set(eventHubOutput, { name });
    }

    return { body: `Hello, ${name}!` };
}

const extraOutputs = [];
if (process.env.storage_APPSETTING) {
    extraOutputs.push(queueOutput);
    extraOutputs.push(blobOutput);
}
if (process.env.cosmosDB_APPSETTING) {
    extraOutputs.push(cosmosDBOutput);
}
if (process.env.serviceBus_APPSETTING) {
    extraOutputs.push(serviceBusQueueOutput);
    extraOutputs.push(serviceBusTopicOutput);
}
if (process.env.eventHub_APPSETTING) {
    extraOutputs.push(eventHubOutput);
}

app.http('helloWorldWithExtraOutputs', {
    authLevel: 'anonymous',
    methods: ['GET', 'POST'],
    extraOutputs,
    handler: helloWorldWithExtraOutputs,
});
