const httpTrigger2 = require('./functions/httpTrigger2');
const queueTrigger1 = require('./functions/queueTrigger1');
const timerTrigger1 = require('./functions/timerTrigger1');
const func = require('@azure/functions-option1');

// 1a
const reqBinding = new func.HttpInputBinding({
    authLevel: "anonymous",
    methods: [
        "get",
        "post"
    ]
});

const resBinding = new func.HttpOutputBinding();

func.app.registerFunction('HttpTrigger1', [reqBinding, resBinding], async function (context) {
    const req = reqBinding.get(context);

    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';

    resBinding.set(context, {
        body: `Hello, ${name}!`
    });
})


// 1b
func.app.registerFunction('HttpTrigger2', httpTrigger2.bindings, httpTrigger2.callback);


// 1c
func.app.registerFunction('TimerTrigger1', timerTrigger1.bindings, timerTrigger1.callback);

func.app.registerFunction('QueueTrigger1', queueTrigger1.bindings, queueTrigger1.callback);
