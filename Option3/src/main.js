const helloWorld = require('./functions/helloWorld');
const helloWorldQueue = require('./functions/helloWorldQueue');
const processQueueMessage = require('./functions/processQueueMessage');
const reminder = require('./functions/reminder');
const func = require('@azure/functions-option3');

// Section A
func.app.get("/helloWorld", (context, req, res) => {
    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    res.send(`Hello, ${name}!`);
});


// Section B
func.app.get("/helloWorld2", helloWorld.callback);

func.app.registerHttpFunction("helloWorldQueue", helloWorldQueue.options, helloWorldQueue.callback);

func.app.registerHttpFunction("helloWorld3", { trigger: { route: "/foo", methods: ["get"] } }, helloWorld.callback);


// Section C
func.app.timer('0 */5 * * * *', reminder.callback);

func.app.registerQueueFunction("processQueueMessage", processQueueMessage.options, processQueueMessage.callback);



