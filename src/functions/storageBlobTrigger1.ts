import { app, InvocationContext, trigger } from "@azure/functions";

export async function storageBlobTrigger1(blob: Buffer, context: InvocationContext): Promise<void> {
    context.log(`Storage blob function processed blob "${context.triggerMetadata.name}" with size "${blob.length}"`);
}

if (process.env.storage_APPSETTING) {
    app.generic('storageBlobTrigger1', {
        trigger: trigger.generic({
            type: 'blobTrigger',
            path: 'helloworldcontainer/{name}',
            connection: 'storage_APPSETTING',
        }),
        handler: storageBlobTrigger1
    });
} else {
    console.warn('Skipping registration of "storageBlobTrigger1" because "storage_APPSETTING" is not defined');
}