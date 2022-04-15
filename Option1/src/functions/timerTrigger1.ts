import { InvocationContext, Timer, TimerCallback } from "@azure/functions-new1";

export const timerTrigger1: TimerCallback = async function (context: InvocationContext, myTimer: Timer): Promise<void> {
    var timeStamp = new Date().toISOString();
    if (myTimer.isPastDue) {
        context.log('Timer function is running late!');
    }
    context.log('Timer trigger function ran!', timeStamp);
};