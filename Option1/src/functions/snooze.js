const func = require('@azure/functions-option1');

const myTimerBinding = new func.TimerInputBinding({
    schedule: '0 */5 * * * *'
});

module.exports.bindings = [myTimerBinding];

module.exports.callback = async function (context) {
    const myTimer = myTimerBinding.get(context);

    var timeStamp = new Date().toISOString();
    if (myTimer.isPastDue) {
        context.log('Timer function is running late!');
    }
    context.log('Snoozed! The current time is: ', timeStamp);
};