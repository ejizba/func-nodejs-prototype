import { app, InvocationContext, Timer } from "@azure/functions";

export async function timerTrigger1(context: InvocationContext, myTimer: Timer): Promise<void> {
    var timeStamp = new Date().toISOString();
    context.log('The current time is: ', timeStamp);
}

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    handler: timerTrigger1
});
