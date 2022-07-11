const helloWorld = require('./functions/helloWorld');
const helloWorldQueue = require('./functions/helloWorldQueue');
const processQueueMessage = require('./functions/processQueueMessage');
const snooze = require('./functions/snooze');
const func = require('@azure/functions-option2');

// Section A
func.app.addHttpFunction('helloWorld', { authLevel: 'anonymous', }, async function (context, req) {
    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    return {
        body: `Hello, ${name}!`
    };
}).addHttpOutput({ name: 'res' });


// Section B
func.app.addHttpFunction('helloWorld2', helloWorld.triggerOptions, helloWorld.callback)
    .addHttpOutput(helloWorld.outputOptions);

func.app.addHttpFunction('helloWorldQueue', { authLevel: 'anonymous', }, helloWorldQueue.callback)
    .addHttpOutput({ name: 'httpResponse' })
    .addQueueOutput({ name: 'queueOutput', queueName: 'testQueue', connection: 'storage_APPSETTING' });


// Section C
func.app.addTimerFunction('snooze', { schedule: '0 */5 * * * *', }, snooze.callback);

func.app.addQueueFunction('processQueueMessage', processQueueMessage.triggerOptions, processQueueMessage.callback);
