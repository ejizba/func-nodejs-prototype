import { app, Context, HttpFunctionContext, HttpRequest } from '@azure/functions-newD';
import { httpMultipleOutputs, httpMultipleOutputsMetadata } from "./functions/httpMultipleOutputs";
import { httpTrigger1, httpTrigger1Metadata } from "./functions/httpTrigger1";
import { timerTrigger1, timerTrigger1Metadata } from "./functions/timerTrigger1";

app.registerFunction('HttpTrigger1', httpTrigger1Metadata, httpTrigger1)

app.registerHttpFunction("SimpleHttpFunction", (context: HttpFunctionContext) => {
    context.log('Node.js HTTP trigger function processed a request. RequestUri=%s', context.req.originalUrl);

    if (context.req.query.name || (context.req.body && context.req.body.name)) {
        context.send("Hello " + (context.req.query.name || context.req.body.name))
    }
    else {
        context.status(400);
        context.send("Please pass a name on the query string or in the request body");
    }
    // other ways to return a response
    // context.json({ foo: "bar" });
    // context.status(200);
    // context.res.setHeader("Content-Type", "text/plain");
});

app.registerHttpFunction("HttpConfigOverride", { route: "/foo", methods: ["get"] }, (context: HttpFunctionContext) => {
    context.send("Hello, world!");
});

type TodoItem = {
    description: string
    id: number
    partitionKey: string
};

app.registerHttpFunction("HttpAdditionalBindings", [{
    type: "cosmosDB",
    name: "toDoItem",
    databaseName: "ToDoItems",
    collectionName: "Items",
    connectionStringSetting: "CosmosDBConnection",
    direction: "in",
    Id: "{Query.id}",
    PartitionKey: "{Query.partitionKeyValue}"
  }
], (context: HttpFunctionContext, todo: TodoItem) => {
    if (!todo) {
        context.status(404);
    } else {
        context.json(todo);
    }
});

app.registerHttpFunction("HttpAdditionalBindingsPlusOverrides", { route: "/todo/{partitionKey}/{id}", methods: ["get"] }, [{
    type: "cosmosDB",
    name: "toDoItem",
    databaseName: "ToDoItems",
    collectionName: "Items",
    connectionStringSetting: "CosmosDBConnection",
    direction: "in",
    Id: "{id}",
    PartitionKey: "{partitionKey}"
  }
], (context: HttpFunctionContext, todo: TodoItem) => {
    if (!todo) {
        context.status(404);
    } else {
        context.json(todo);
    }
});

app.registerFunction('TimerTrigger1', timerTrigger1Metadata, timerTrigger1);

app.registerFunction('HttpMultipleOutputs', httpMultipleOutputsMetadata, httpMultipleOutputs);

app.registerFunction('HttpTriggerInline', {
    bindings: [
        {
            authLevel: "anonymous",
            type: "httpTrigger",
            direction: "in",
            name: "req",
            methods: [
                "get",
                "post"
            ]
        },
        {
            type: "http",
            direction: "out",
            name: "res"
        }
    ]
}, async (context: Context, req: HttpRequest) => {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
});
