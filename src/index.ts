import { app, HttpRequest, InvocationContext, Timer } from "@azure/functions";

app.get('helloWorld1', async (context: InvocationContext, request: HttpRequest) => {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.get('name') || await request.text() || 'world';

    return { body: `Hello, ${name}!` };
});

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    handler: (context: InvocationContext, myTimer: Timer) => {
        var timeStamp = new Date().toISOString();
        context.log('The current time is: ', timeStamp);
    }
});


