module.exports.options = {
    trigger: {
        name: 'myQueueItem',
        queueName: 'testQueue',
        connection: 'storage_APPSETTING'
    }
}

module.exports.callback = async function (context, myQueueItem) {
    context.log('Queue trigger function processed work item', myQueueItem);
};