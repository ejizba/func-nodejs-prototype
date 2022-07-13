import { Binding, InvocationContext, TimerInputBinding } from "@azure/functions-option1";

const myTimerBinding = new TimerInputBinding({
    schedule: '0 */5 * * * *'
});

export const snoozeBindings: Binding[] = [myTimerBinding];

export async function snooze(context: InvocationContext): Promise<void> {
    const myTimer = myTimerBinding.get(context);

    var timeStamp = new Date().toISOString();
    if (myTimer.isPastDue) {
        context.log('Timer function is running late!');
    }
    context.log('Snoozed! The current time is: ', timeStamp);
};