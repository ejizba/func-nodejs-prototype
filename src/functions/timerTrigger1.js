const { app } = require('@azure/functions');

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    handler: (context, myTimer) => {
        const timeStamp = new Date().toISOString();
        context.log('Timer function processed request. The current time is:', timeStamp);
    }
});
