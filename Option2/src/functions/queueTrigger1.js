module.exports.triggerOptions = {
    queueName: 'testQueue',
    connection: 'storage_APPSETTING'
}

module.exports.callback = async function (context, myQueueItem) {
    context.log('Function processed work item', myQueueItem);
};