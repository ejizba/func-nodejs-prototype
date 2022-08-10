const { QueueInput } = require('@azure/functions');

const processQueueMessageOptions = {
    trigger: new QueueInput({ queueName: 'helloworldqueue', connection: 'storage_APPSETTING' })
}

async function processQueueMessage(context, myQueueItem) {
    context.log('Queue trigger function processed work item', myQueueItem);
};

module.exports = { processQueueMessageOptions, processQueueMessage };
