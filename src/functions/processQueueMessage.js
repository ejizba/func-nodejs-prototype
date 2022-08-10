const { input } = require('@azure/functions');

const processQueueMessageOptions = {
    trigger: input.queue({ queueName: 'helloworldqueue', connection: 'storage_APPSETTING' })
}

async function processQueueMessage(context, myQueueItem) {
    context.log('Queue trigger function processed work item', myQueueItem);
};

module.exports = { processQueueMessageOptions, processQueueMessage };
