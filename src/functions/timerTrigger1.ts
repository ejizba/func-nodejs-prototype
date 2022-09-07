import { app, InvocationContext, Timer, trigger } from "@azure/functions";

export async function timerTrigger1(context: InvocationContext, myTimer: Timer): Promise<void> {
    const timeStamp = new Date().toISOString();
    context.log('Timer function processed request. The current time is:', timeStamp);
}

app.generic('timerTrigger1', {
    trigger: trigger.generic({
        type: 'timerTrigger',
        schedule: '0 */5 * * * *',
    }),
    handler: timerTrigger1
});
