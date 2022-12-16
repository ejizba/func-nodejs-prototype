import { app, input, InvocationContext, output } from '@azure/functions';

const blobInput = input.storageBlob({
    connection: 'storage_APPSETTING',
    path: 'helloworld/{queueTrigger}',
});

const blobOutput = output.storageBlob({
    connection: 'storage_APPSETTING',
    path: 'helloworld/{queueTrigger}-copy',
});

export async function copyBlob1(queueItem: unknown, context: InvocationContext): Promise<void> {
    context.log('Storage queue function processed work item:', queueItem);

    const blobInputValue = context.extraInputs.get(blobInput);
    context.extraOutputs.set(blobOutput, blobInputValue);
}

if (process.env.storage_APPSETTING) {
    app.storageQueue('copyBlob1', {
        queueName: 'copyblobqueue',
        connection: 'storage_APPSETTING',
        extraInputs: [blobInput],
        extraOutputs: [blobOutput],
        handler: copyBlob1,
    });
} else {
    console.warn('Skipping registration of "copyBlob1" because "storage_APPSETTING" is not defined');
}
