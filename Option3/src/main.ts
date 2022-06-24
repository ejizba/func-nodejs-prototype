import { app, HttpRequest, HttpResponse, InvocationContext } from '@azure/functions-newE';
import { httpTrigger1 } from './functions/httpTrigger1';
import { httpOutputOptions, httpTrigger2 } from './functions/httpTrigger2';
import { queueTrigger1, queueTrigger1Options } from './functions/queueTrigger1';
import { timerTrigger1 } from './functions/timerTrigger1';

// Task 1a
// Read the following code and answer the questions below

app.get("/HttpTrigger", (context: InvocationContext, req: HttpRequest, res: HttpResponse) => {
    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    res.send(`Hello, ${name}!`);
});

// How would you describe what the code is doing? 
// How would you change the URL endpoint of this Http trigger?

// Task 1b
// Explore the following functions
// What do they do?
// How do they compare with each other and to the one in Task 1a?

app.get("/HttpTrigger1", httpTrigger1);

app.registerHttpFunction("HttpTrigger2", httpOutputOptions, httpTrigger2);

app.registerHttpFunction("HttpTrigger3", { trigger: { route: "/foo", methods: ["get"] } }, httpTrigger1);

// Task 2
// Explore the following functions one by one.
// What do they do? 
app.timer('0 */5 * * * *', timerTrigger1);

app.registerQueueFunction("QueueTrigger1", queueTrigger1Options, queueTrigger1);

// Discussion: 
// How would you organize the code?
// What's intuitive/not?
// What do you like/dislike? What would you change?

// Bonus: Imagine the timer trigger is used to track the status of a system. 
// Every time it triggers, you want it to send the status to a storage queue. How would you do this?


