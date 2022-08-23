import { app, InvocationContext } from "@azure/functions";

export async function cosmosDBTrigger1(context: InvocationContext, documents: unknown[]): Promise<void> {
    context.log(`Cosmos DB function processed ${documents.length} documents`);
}

app.cosmosDB('cosmosDBTrigger1', {
    connectionStringSetting: 'cosmosDB_APPSETTING',
    databaseName: 'helloWorldDB',
    collectionName: 'helloWorldCol',
    partitionKey: '/id',
    createLeaseCollectionIfNotExists: true,
    handler: cosmosDBTrigger1
});