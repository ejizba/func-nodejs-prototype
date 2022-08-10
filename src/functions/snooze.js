const { app } = require('@azure/functions');

app.timer('snooze', {
    trigger: { schedule: '0 */5 * * * *' },
    handler: async (context, myTimer) => {
        var timeStamp = new Date().toISOString();
        context.log('The current time is: ', timeStamp);
    }
});
