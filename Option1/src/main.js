const helloWorldQueue = require('./functions/helloWorldQueue');
const processQueueMessage = require('./functions/processQueueMessage');
const reminder = require('./functions/reminder');
const func = require('@azure/functions-option1');

// Section A
const reqBinding = new func.HttpInputBinding({
    authLevel: "anonymous",
    methods: [
        "get",
        "post"
    ]
});

const resBinding = new func.HttpOutputBinding();

func.app.registerFunction('helloWorld', [reqBinding, resBinding], async function (context) {
    const req = reqBinding.get(context);

    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';

    resBinding.set(context, {
        body: `Hello, ${name}!`
    });
})


// Section B
func.app.registerFunction('helloWorldQueue', helloWorldQueue.bindings, helloWorldQueue.callback);


// Section C
func.app.registerFunction('reminder', reminder.bindings, reminder.callback);

func.app.registerFunction('processQueueMessage', processQueueMessage.bindings, processQueueMessage.callback);
