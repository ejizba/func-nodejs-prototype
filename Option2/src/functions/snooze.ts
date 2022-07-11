import { InvocationContext, Timer } from "@azure/functions-option2";

export async function snooze(context: InvocationContext, myTimer: Timer): Promise<void> {
    var timeStamp = new Date().toISOString();
    if (myTimer.isPastDue) {
        context.log('Timer function is running late!');
    }
    context.log('Snoozed! The current time is: ', timeStamp);
};