import { app, HttpInputBinding, HttpOutputBinding, InvocationContext } from "@azure/functions-newB";
import { httpTrigger2, httpOutputsBindings } from "./functions/httpTrigger2";
import { queueTrigger1, queueTrigger1Bindings } from "./functions/queueTrigger1";
import { timerTrigger1, timerTrigger1Bindings } from "./functions/timerTrigger1";

// Task 1
// Read the following code and answer the questions below

// [what does HttpInputBinding take as parameters and what are the types (if possible to show)]?
const reqBinding = new HttpInputBinding({
    authLevel: "anonymous",
    methods: [
        "get",
        "post"
    ]
});

const resBinding = new HttpOutputBinding();

// [Can we add doc strings for InvocationContext (or just in general?)]
app.registerFunction('HttpTrigger1', [reqBinding, resBinding], async function (context: InvocationContext): Promise<void> {
    const req = reqBinding.get(context);

    context.log(`RequestUrl=${req.url}`);

    // [req methods/properties change depending on binding type right? Is there a way to expose what they are, like req. would show hints]
    const name = req.query.name || req.body?.name || 'world';

    // [what does set() take as parameters -- seems to take anything now?]
    resBinding.set(context, {
        // status: 200, /* Defaults to 200 */
        body: `Hello, ${name}!`
    });
})
// Imagine you're writing this sample as part of a documentation, how would you describe what the code is doing? 
// What is the function triggered by? What does the function do? 
// How would you make the function return a different HTTP response?
// What do you think `registerFunction` does?

// Task 2
// Explore the following functions one by one.
// What do they do? 
// [Is there anything we want them to change?]
app.registerFunction('HttpTrigger2', httpOutputsBindings, httpTrigger2);
// 

app.registerFunction('TimerTrigger1', timerTrigger1Bindings, timerTrigger1);

app.registerFunction('QueueTrigger1', queueTrigger1Bindings, queueTrigger1);

// Discussion: 
// How would you organize the code?
// What's inituitve/not?
// What do you like/dislike? What would you change?
