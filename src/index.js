const { app } = require('@azure/functions');

app.get('httpTrigger1', async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || await request.text() || 'world';

    return { body: `Hello, ${name}!` };
});

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    handler: (myTimer, context) => {
        var timeStamp = new Date().toISOString();
        context.log('The current time is: ', timeStamp);
    }
});
