import { InvocationContext, Timer } from "@azure/functions-option2";

export async function reminder(context: InvocationContext, myTimer: Timer): Promise<void> {
    var timeStamp = new Date().toISOString();
    if (myTimer.isPastDue) {
        context.log('Timer function is running late!');
    }
    context.log('The current time is: ', timeStamp);
};