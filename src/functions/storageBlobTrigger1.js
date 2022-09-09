const { app } = require('@azure/functions');

if (process.env.storage_APPSETTING) {
    app.storageBlob('storageBlobTrigger1', {
        path: 'helloworldcontainer/{name}',
        connection: 'storage_APPSETTING',
        handler: (context, blob) => {
            context.log(`Storage blob function processed blob "${context.triggerMetadata.name}" with size ${blob.length} bytes`);
        }
    });
} else {
    console.warn('Skipping registration of "storageBlobTrigger1" because "storage_APPSETTING" is not defined');
}