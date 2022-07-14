import { InvocationContext, Timer, TimerFunctionOptions, TimerInput } from "@azure/functions-prototype";

export const snoozeOptions: TimerFunctionOptions = {
    trigger: new TimerInput({ schedule: '0 */5 * * * *' })
}

export async function snooze(context: InvocationContext, myTimer: Timer): Promise<void> {
    var timeStamp = new Date().toISOString();
    context.log('The current time is: ', timeStamp);
};
