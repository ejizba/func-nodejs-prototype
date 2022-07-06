module.exports.options = {
    outputBindings: [
        { name: 'queueOutput', queueName: 'testQueue', connection: 'storage_APPSETTING' }
    ]
}

module.exports.callback = async function (context, req, res) {
    context.log(`HTTP trigger function processed a request. RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    context.outputBindings.queueOutput = { name };
    res.send(`Hello, ${name}!`);
};