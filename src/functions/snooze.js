const { input } = require('@azure/functions');

const snoozeOptions = {
    trigger: input.timer({ schedule: '0 */5 * * * *' })
}

async function snooze(context, myTimer) {
    var timeStamp = new Date().toISOString();
    context.log('The current time is: ', timeStamp);
};

module.exports = { snoozeOptions, snooze };
