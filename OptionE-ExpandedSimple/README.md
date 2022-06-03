# Option E

This option is a merge of the A and C samples, and also applying some opinions on how it could be written.

The main design points:

- Uses an `app` root object for all function registrations
  - I like this approach as it mirrors the kind of thing we find with Express, Fastify, and other web frameworks
  - It also makes for a clear ordering to the Functions that are defined, so if you've got multiple HTTP triggers that work off _similar_ routes, you should have a clear order of precedence
  - It would also make it easier to have discovery, rather than having to know what you can import, you import one thing and intellisense will tell you want it can do
- In addition to have the most primitive method for registering (which the A design has), this provides some opinionated wrappers on the built-in triggers:

```ts
app.registerHttpFunction(
  "SimpleHttpFunction",
  (context: HttpFunctionContext) => {
    context.log(
      "Node.js HTTP trigger function processed a request. RequestUri=%s",
      context.req.originalUrl
    );

    if (context.req.query.name || (context.req.body && context.req.body.name)) {
      context.send(
        "Hello " + (context.req.query.name || context.req.body.name)
      );
    } else {
      context.status(400);
      context.send(
        "Please pass a name on the query string or in the request body"
      );
    }
    // other ways to return a response
    // context.json({ foo: "bar" });
    // context.status(200);
    // context.res.setHeader("Content-Type", "text/plain");
  }
);
```

This is a _most opinionated_ HTTP trigger. Note that you don't provide any configuration to it, instead we provide a default configuration for the HTTP trigger and output binding, using whatever we deem to be best practice.

We also use a `HttpFunctionContext` rather than `Context` as the type of the `context` object, which exposes a more Express-like API for working with the request/response, like having a `send` method for a plain text response, or `json` for sending a JSON response. Likely this would just set `context.res` internally, but we abstract that away so you use what you are familiar with, rather than _learn Functions_.

If you want to override any of the trigger binding configuration, you can pass that in as a second argument:

```ts
app.registerHttpFunction(
  "HttpConfigOverride",
  { route: "/foo", methods: ["get"] },
  (context: HttpFunctionContext) => {
    context.send("Hello, world!");
  }
);
```

This user-provided input configuration is merged over the default, overriding what the developer sets but leaving defaults.

When you want to have additional input bindings, they can be provided as well:

```ts
type TodoItem = {
  description: string;
  id: number;
  partitionKey: string;
};

app.registerHttpFunction(
  "HttpAdditionalBindings",
  [
    {
      type: "cosmosDB",
      name: "toDoItem",
      databaseName: "ToDoItems",
      collectionName: "Items",
      connectionStringSetting: "CosmosDBConnection",
      direction: "in",
      Id: "{Query.id}",
      PartitionKey: "{Query.partitionKeyValue}",
    },
  ],
  (context: HttpFunctionContext, todo: TodoItem) => {
    if (!todo) {
      context.status(404);
    } else {
      context.json(todo);
    }
  }
);
```

Here the HTTP trigger/output are left using our conventions, but the second argument now adds a Cosmos input binding to the binding to the Function.

Lastly, you can combine it all:

```ts
app.registerHttpFunction(
  "HttpAdditionalBindingsPlusOverrides",
  { route: "/todo/{partitionKey}/{id}", methods: ["get"] },
  [
    {
      type: "cosmosDB",
      name: "toDoItem",
      databaseName: "ToDoItems",
      collectionName: "Items",
      connectionStringSetting: "CosmosDBConnection",
      direction: "in",
      Id: "{id}",
      PartitionKey: "{partitionKey}",
    },
  ],
  (context: HttpFunctionContext, todo: TodoItem) => {
    if (!todo) {
      context.status(404);
    } else {
      context.json(todo);
    }
  }
);
```

_Note: I've inlined everything in the sample, but the binding options or callback functions can always be moved to another file._
