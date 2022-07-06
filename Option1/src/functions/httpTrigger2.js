const func = require('@azure/functions-option1');

const reqBinding = new func.HttpInputBinding({
    authLevel: "anonymous",
    methods: [
        "get",
        "post"
    ]
});
const resBinding = new func.HttpOutputBinding();
const queueBinding = new func.QueueOutputBinding({
    queueName: 'testQueue',
    connection: 'storage_APPSETTING'
});

module.exports.bindings = [reqBinding, resBinding, queueBinding];

module.exports.callback = async function (context) {
    const req = reqBinding.get(context);

    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    resBinding.set(context, {
        body: `Hello, ${name}!`
    });
    queueBinding.set(context, { name });
};