import { app, InvocationContext } from "@azure/functions";

export async function storageBlobTrigger1(context: InvocationContext, blob: Buffer): Promise<void> {
    context.log(`Storage blob function processed blob "${context.triggerMetadata.name}" with size "${blob.length}"`);
}

app.storageBlob('storageBlobTrigger1', {
    path: 'helloworldcontainer/{name}',
    connection: 'storage_APPSETTING',
    handler: storageBlobTrigger1
});