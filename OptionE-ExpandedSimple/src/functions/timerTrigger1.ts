import { Context } from "@azure/functions";

export async function timerTrigger1(context: Context, myTimer: any): Promise<void> {
    var timeStamp = new Date().toISOString();

    if (myTimer.isPastDue) {
        context.log('Timer function is running late!');
    }
    context.log('Timer trigger function ran!', timeStamp);
};

export const timerTrigger1Metadata = {
    bindings: [
        {
            name: "myTimer",
            type: "timerTrigger",
            direction: "in",
            schedule: "0 */5 * * * *"
        }
    ]
};