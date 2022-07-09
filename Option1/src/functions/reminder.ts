import { Binding, InvocationContext, TimerInputBinding } from "@azure/functions-option1";

const myTimerBinding = new TimerInputBinding({
    schedule: '0 */5 * * * *'
});

export const reminderBindings: Binding[] = [myTimerBinding];

export async function reminder(context: InvocationContext): Promise<void> {
    const myTimer = myTimerBinding.get(context);

    var timeStamp = new Date().toISOString();
    if (myTimer.isPastDue) {
        context.log('Timer function is running late!');
    }
    context.log('The current time is: ', timeStamp);
};