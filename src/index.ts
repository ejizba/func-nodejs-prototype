import {
    app,
    AppStartContext,
    HttpRequest,
    InvocationContext,
    PostInvocationContext,
    PreInvocationContext,
    Timer,
} from '@azure/functions';

app.get('httpTrigger1', async (request: HttpRequest, context: InvocationContext) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || (await request.text()) || 'world';

    return { body: `Hello, ${name}!` };
});

app.get('httpTrigger2', async (context: InvocationContext, request: HttpRequest) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || (await request.text()) || 'world';

    return { body: `Hello, ${name}!` };
});

app.onStart((context: AppStartContext) => {
    console.log(`App start woooooo. Function dir is ${context.functionAppDirectory}`);
});

app.onPreInvocation(['httpTrigger1'], (context: PreInvocationContext) => {
    context.invocationContext.log(`pre invocation for ${context.invocationContext.functionName}`);
});

app.onPostInvocation([], (context: PostInvocationContext) => {
    context.invocationContext.log(`post invocation for ${context.invocationContext.functionName}`);
});

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    handler: (myTimer: Timer, context: InvocationContext) => {
        var timeStamp = new Date().toISOString();
        context.log('The current time is: ', timeStamp);
    },
});
