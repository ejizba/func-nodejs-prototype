import { app, HttpInputBinding, HttpOutputBinding, InvocationContext } from "@azure/functions-newB";
import { httpOutputsBindings, httpTrigger2 } from "./functions/httpTrigger2";
import { queueTrigger1, queueTrigger1Bindings } from "./functions/queueTrigger1";
import { timerTrigger1, timerTrigger1Bindings } from "./functions/timerTrigger1";

// Task 1a
// Read the following code and answer the questions below

const reqBinding = new HttpInputBinding({
    authLevel: "anonymous",
    methods: [
        "get",
        "post"
    ]
});

const resBinding = new HttpOutputBinding();

app.registerFunction('HttpTrigger1', [reqBinding, resBinding], async function (context: InvocationContext): Promise<void> {
    const req = reqBinding.get(context);

    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body?.name || 'world';

    resBinding.set(context, {
        body: `Hello, ${name}!`
    });
})
// How would you describe what the code is doing? 
// What is the function triggered by? What does the function do? 
// What do you think `registerFunction` does?

// Task 1b
// Explore the following function.
// What does it do? How does it compare to the one in 1a?
// How would you change the URL endpoint of this Http trigger?
app.registerFunction('HttpTrigger2', httpOutputsBindings, httpTrigger2);

// Task 2
// Explore the following functions.
// What do they do? 
// How would you add an Http output binding to the timer trigger that returns the string "It is time!"?
app.registerFunction('TimerTrigger1', timerTrigger1Bindings, timerTrigger1);

app.registerFunction('QueueTrigger1', queueTrigger1Bindings, queueTrigger1);

// Discussion: 
// How would you organize the code?
// What's intuitive/not?
// What do you like/dislike? What would you change?
