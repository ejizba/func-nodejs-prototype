module.exports.callback = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    if (myTimer.isPastDue) {
        context.log('Timer function is running late!');
    }
    context.log('The current time is: ', timeStamp);
};