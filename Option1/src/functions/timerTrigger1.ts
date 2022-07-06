import { Binding, InvocationContext, TimerInputBinding } from "@azure/functions-option1";

const myTimerBinding = new TimerInputBinding({
    schedule: '0 */5 * * * *'
});

export const timerTrigger1Bindings: Binding[] = [myTimerBinding];

export async function timerTrigger1(context: InvocationContext): Promise<void> {
    const myTimer = myTimerBinding.get(context);

    var timeStamp = new Date().toISOString();
    if (myTimer.isPastDue) {
        context.log('Timer function is running late!');
    }
    context.log('Timer trigger function ran!', timeStamp);
};