import { app, HttpRequest, InvocationContext, output, Timer, trigger } from "@azure/functions";

app.generic('helloWorld1', {
    trigger: trigger.generic({
        type: 'httpTrigger',
        methods: ['GET']
    }),
    return: output.generic({
        type: 'http'
    }),
    handler: async (context: InvocationContext, request: HttpRequest) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';

        return { body: `Hello, ${name}!` };
    }
});

app.generic('timerTrigger1', {
    trigger: trigger.generic({
        type: 'timerTrigger',
        schedule: '0 */5 * * * *',
    }),
    handler: (context: InvocationContext, myTimer: Timer) => {
        var timeStamp = new Date().toISOString();
        context.log('The current time is: ', timeStamp);
    } 
});