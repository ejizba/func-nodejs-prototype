import { app, InvocationContext } from "@azure/functions";

export async function storageBlobTrigger1(context: InvocationContext, blob: Buffer): Promise<void> {
    context.log(`Storage blob function processed blob "${context.triggerMetadata.name}" with size ${blob.length} bytes`);
}

if (process.env.storage_APPSETTING) {
    app.storageBlob('storageBlobTrigger1', {
        path: 'helloworldcontainer/{name}',
        connection: 'storage_APPSETTING',
        handler: storageBlobTrigger1
    });
} else {
    console.warn('Skipping registration of "storageBlobTrigger1" because "storage_APPSETTING" is not defined');
}