import { input, InvocationContext, Timer, TimerFunctionOptions } from "@azure/functions";

export const snoozeOptions: TimerFunctionOptions = {
    trigger: input.timer({ schedule: '0 */5 * * * *' })
}

export async function snooze(context: InvocationContext, myTimer: Timer): Promise<void> {
    var timeStamp = new Date().toISOString();
    context.log('The current time is: ', timeStamp);
};
