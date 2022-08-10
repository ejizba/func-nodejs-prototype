import { TimerInput } from "@azure/functions";

export const snoozeOptions = {
    trigger: new TimerInput({ schedule: '0 */5 * * * *' })
}

export async function snooze(context, myTimer) {
    var timeStamp = new Date().toISOString();
    context.log('The current time is: ', timeStamp);
};
