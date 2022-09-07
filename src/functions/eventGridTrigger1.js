const { app } = require('@azure/functions');

app.eventGrid('eventGridTrigger1', {
    handler: (context, event) => {
        context.log('Event grid function processed event:', event);
    }
});