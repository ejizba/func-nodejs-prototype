const httpTrigger1 = require('./functions/httpTrigger1');
const httpTrigger2 = require('./functions/httpTrigger2');
const queueTrigger1 = require('./functions/queueTrigger1');
const timerTrigger1 = require('./functions/timerTrigger1');
const func = require('@azure/functions-option2');

// Section A
func.app.addHttpFunction('HttpTriggerInline', { authLevel: 'anonymous', }, async function (context, req) {
    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    return {
        body: `Hello, ${name}!`
    };
}).addHttpOutput({ name: 'res' });


// Section B
func.app.addHttpFunction('HttpTrigger1', httpTrigger1.triggerOptions, httpTrigger1.callback)
    .addHttpOutput(httpTrigger1.outputOptions);

func.app.addHttpFunction('HttpTrigger2', { authLevel: 'anonymous', }, httpTrigger2.callback)
    .addHttpOutput({ name: 'httpResponse' })
    .addQueueOutput({ name: 'queueOutput', queueName: 'testQueue', connection: 'storage_APPSETTING' });


// Section C
func.app.addTimerFunction('TimerTrigger1', { schedule: '0 */5 * * * *', }, timerTrigger1.callback);

func.app.addQueueFunction('QueueTrigger1', queueTrigger1.triggerOptions, queueTrigger1.callback);
