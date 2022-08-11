import { app, InvocationContext, Timer } from "@azure/functions";

async function snooze(context: InvocationContext, myTimer: Timer): Promise<void> {
    var timeStamp = new Date().toISOString();
    context.log('The current time is: ', timeStamp);
}

app.timer('snooze', {
    schedule: '0 */5 * * * *',
    handler: snooze
});
