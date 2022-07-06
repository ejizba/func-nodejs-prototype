import { app, HttpRequest, HttpResponse, InvocationContext } from '@azure/functions-option3';
import { httpTrigger1 } from './functions/httpTrigger1';
import { httpOutputOptions, httpTrigger2 } from './functions/httpTrigger2';
import { queueTrigger1, queueTrigger1Options } from './functions/queueTrigger1';
import { timerTrigger1 } from './functions/timerTrigger1';

// 1a
app.get("/HttpTrigger", (context: InvocationContext, req: HttpRequest, res: HttpResponse) => {
    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    res.send(`Hello, ${name}!`);
});


// 1b
app.get("/HttpTrigger1", httpTrigger1);

app.registerHttpFunction("HttpTrigger2", httpOutputOptions, httpTrigger2);

app.registerHttpFunction("HttpTrigger3", { trigger: { route: "/foo", methods: ["get"] } }, httpTrigger1);


// 1c
app.timer('0 */5 * * * *', timerTrigger1);

app.registerQueueFunction("QueueTrigger1", queueTrigger1Options, queueTrigger1);



