import { app, EventGridEvent, InvocationContext } from '@azure/functions';

export async function eventGridTrigger1(context: InvocationContext, event: EventGridEvent): Promise<void> {
    context.log('Event grid function processed event:', event);
}

app.eventGrid('eventGridTrigger1', {
    handler: eventGridTrigger1
});
