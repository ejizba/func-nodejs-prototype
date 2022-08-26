import { app, HttpRequest, HttpResponse, InvocationContext, output } from "@azure/functions";

const queueOutput = output.storageQueue({
    queueName: 'helloworldqueue',
    connection: 'storage_APPSETTING'
});
const blobOutput = output.storageBlob({
    connection: 'storage_APPSETTING',
    path: 'helloworldcontainer/hello-at-{DateTime}',
})
const cosmosDBOutput = output.cosmosDB({
    connectionStringSetting: 'cosmosDB_APPSETTING',
    databaseName: 'helloWorldDB',
    collectionName: 'helloWorldCol',
    partitionKey: '/id',
});
const serviceBusQueueOutput = output.serviceBusQueue({
    connection: 'serviceBus_APPSETTING',
    queueName: 'helloWorldQueue'
});
const serviceBusTopicOutput = output.serviceBusTopic({
    connection: 'serviceBus_APPSETTING',
    topicName: 'helloWorldTopic'
});
const eventHubOutput = output.eventHub({
    connection: 'eventHub_APPSETTING',
    eventHubName: 'helloWorldHub'
});
async function helloWorldWithExtraOutputs(context: InvocationContext, request: HttpRequest): Promise<HttpResponse> {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || await request.text() || 'world';

    context.extraOutputs.set(queueOutput, { name });
    context.extraOutputs.set(blobOutput, { name });
    context.extraOutputs.set(cosmosDBOutput, [{ name }]);
    context.extraOutputs.set(serviceBusQueueOutput, { name });
    context.extraOutputs.set(serviceBusTopicOutput, { name });
    context.extraOutputs.set(eventHubOutput, { name });

    return { body: `Hello, ${name}!` };
}

app.http('helloWorldWithExtraOutputs', {
    authLevel: "anonymous",
    methods: ['GET', 'POST'],
    extraOutputs: [queueOutput, blobOutput, cosmosDBOutput, serviceBusQueueOutput, serviceBusTopicOutput, eventHubOutput],
    handler: helloWorldWithExtraOutputs
});