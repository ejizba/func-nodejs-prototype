const httpTrigger1 = require('./functions/httpTrigger1');
const httpTrigger2 = require('./functions/httpTrigger2');
const queueTrigger1 = require('./functions/queueTrigger1');
const timerTrigger1 = require('./functions/timerTrigger1');
const func = require('@azure/functions-option3');

// 1a
func.app.get("/HttpTrigger", (context, req, res) => {
    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    res.send(`Hello, ${name}!`);
});


// 1b
func.app.get("/HttpTrigger1", httpTrigger1.callback);

func.app.registerHttpFunction("HttpTrigger2", httpTrigger2.options, httpTrigger2.callback);

func.app.registerHttpFunction("HttpTrigger3", { trigger: { route: "/foo", methods: ["get"] } }, httpTrigger1.callback);


// 1c
func.app.timer('0 */5 * * * *', timerTrigger1.callback);

func.app.registerQueueFunction("QueueTrigger1", queueTrigger1.options, queueTrigger1.callback);



