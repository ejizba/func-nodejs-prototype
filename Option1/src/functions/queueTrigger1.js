const func = require('@azure/functions-option1');

const queueBinding = new func.QueueInputBinding({
    queueName: 'testQueue',
    connection: 'storage_APPSETTING'
});

module.exports.bindings = [queueBinding];

module.exports.callback = async function (context) {
    const myQueueItem = queueBinding.get(context);
    context.log('Queue trigger function processed work item', myQueueItem);
};