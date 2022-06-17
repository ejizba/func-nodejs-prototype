import { app, HttpRequest, HttpResponse, InvocationContext, Timer } from '@azure/functions-newE';

/**
 * The simplest, most-opionated example for an http trigger
 */
app.get("/helloWorld", (context: InvocationContext, req: HttpRequest, res: HttpResponse) => {
    context.log('Node.js HTTP trigger function processed a request. RequestUri=%s', req.url);

    if (req.query.name || (req.body && req.body.name)) {
        res.send("Hello " + (req.query.name || req.body.name))
    } else {
        res.status(400);
        res.send("Please pass a name on the query string or in the request body");
    }
});

/**
 * The simplest, most-opionated example for a timer trigger
 */
app.timer('0 */5 * * * *', (context: InvocationContext, myTimer: Timer) => {
    var timeStamp = new Date().toISOString();
    if (myTimer.isPastDue) {
        context.log('Timer function is running late!');
    }
    context.log('Timer trigger function ran!', timeStamp);
});

/**
 * If you want to override any of the trigger binding configuration, you can pass that in as a second argument
 * This user-provided input configuration is merged over the default, overriding what the developer sets but leaving defaults.
 */
app.registerHttpFunction("HttpConfigOverride", { trigger: { route: "/foo", methods: ["get"] } }, (context: InvocationContext, req: HttpRequest, res: HttpResponse) => {
    res.send("Hello, world!");
});

type TodoItem = {
    description: string
    id: number
    partitionKey: string
};

/**
 * When you want to have additional input bindings, they can be provided as well
 * Here the HTTP trigger/output are left using our conventions, but the second argument now adds a Cosmos input binding to the binding to the Function.
 */
app.registerHttpFunction("HttpAdditionalBindings", {
    inputBindings: [{
        type: "cosmosDB",
        name: "toDoItem",
        databaseName: "ToDoItems",
        collectionName: "Items",
        connectionStringSetting: "CosmosDBConnection",
        Id: "{Query.id}",
        PartitionKey: "{Query.partitionKeyValue}"
    }]
}, (context: InvocationContext, req: HttpRequest, res: HttpResponse, todo: TodoItem) => {
    if (!todo) {
        res.status(404);
    } else {
        res.json(todo);
    }
});

/**
 * Lastly, you can combine it all
 */
app.registerHttpFunction("HttpAdditionalBindingsPlusOverrides", {
    trigger: { route: "/todo/{partitionKey}/{id}", methods: ["get"] },
    inputBindings: [{
        type: "cosmosDB",
        name: "toDoItem",
        databaseName: "ToDoItems",
        collectionName: "Items",
        connectionStringSetting: "CosmosDBConnection",
        Id: "{id}",
        PartitionKey: "{partitionKey}"
    }]
}, (context: InvocationContext, req: HttpRequest, res: HttpResponse, todo: TodoItem) => {
    if (!todo) {
        res.status(404);
    } else {
        res.json(todo);
    }
});

