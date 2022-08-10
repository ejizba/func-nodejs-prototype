import { app, input, InvocationContext, Timer, TimerFunctionOptions } from "@azure/functions";

export const snoozeOptions: TimerFunctionOptions = {
    trigger: input.timer({ schedule: '0 */5 * * * *' })
}
app.timer('snooze', async function (context: InvocationContext, myTimer: Timer): Promise<void> {
    var timeStamp = new Date().toISOString();
    context.log('The current time is: ', timeStamp);
}, snoozeOptions);
