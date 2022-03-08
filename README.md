# ✨ New ✨ programming model for Node.js Azure Functions

See [this rollup issue](https://github.com/Azure/azure-functions-nodejs-worker/issues/480) for more information on general goals

# Code in this repo

- `src/main.ts`: The main entrypoint for a sample TypeScript app
- `src-js/main.js`: The main entrypoint for a sample JavaScript app
- `types/index.d.ts`: Types for the new packages as described below

# Top takeaways

## Define your functions in code!

With the help of the new [Worker Indexing feature](https://github.com/Azure/azure-functions-host/wiki/Worker-Indexing-Changes), users will be able to define their functions in their TypeScript/JavaScript files instead of "function.json" files! While a huge part of the new programming model, this concept is not unique to the prototype in this repo. Benefits are discussed in [the rollup issue](https://github.com/Azure/azure-functions-nodejs-worker/issues/480) and the implementation is discussed in the "API" section below.

## Split up the worker

The first and most important thing I propose is we split the worker up into two pieces, one that ships as-is with the host and one that ships as a separate node module (from here on out, I will reference these as the "worker" and "programming model" packages respectively).

### Package differences

|Worker package ("@azure/functions-worker")|Programming model package ("@azure/functions")|
|---|---|
|Required - we _have_ to create this package no matter what|Optional - we do not _need_ this package. Instead, we could put everything in the worker package|
|built-in module shipped with the worker - _not_ listed in user's package.json|shipped with the user's app - listed in their package.json dependencies|
|slow to update because it relies on the host release cycle|fast to update - just publishing an npm package|
|forced on the user when it does update|user decides when to take the update|
|backwards compatability is paramount|backwards compatability is nice, but we can easily do a new major version|
|barebones API, very unopinionated|fancy api with lots of nice intellisense, can be opinionated|

### A few technical details

I propose the worker should be stripped down to just setting up and managing the gRPC channel used to communicate with the host. It would provide a very limited API in the form the worker package. This API would prioritize flexiblity over usability (i.e. Intellisense) to avoid the need for any breaking changes in the future. We can provide a types package for it (ideally as a part of [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) named `@types/azure_functions-worker`), but most users should never interact with this API directly and thus we don't need detailed types or intellisense. The main consumer of this API is the programming model package. The programming model package should include anything that makes our user's lives easier, for example anything that parses/converts/handles data from the host (`Context`, `HttpRequest`, etc.).

### Benefits

- When we make breaking changes (like [this](https://github.com/Azure/azure-functions-nodejs-worker/issues/388)), users will be able to choose when they integrate those changes as opposed to us forcing it on them in Azure.
- We can easily support multiple different programming models in their own packages (whether they're created by us or other people) at the same time. [This PR](https://github.com/Azure/azure-functions-nodejs-worker/pull/529) is one example where we run into difficulties today because our various models are combined into the worker.
- Since both JS and TS users will need the npm package to run their app, they will both get the same experience of [intellisense in VS Code](https://code.visualstudio.com/docs/nodejs/working-with-javascript#_intellisense)
- To help with the transition from the old programming model to the new, we can provide a "legacy" package that replicates the existing behavior of the worker

## VS Code inspired API

The next part of my proposal is the programming model itself (basically everything in the `@azure/functions-new` module). I would say I was most inspired by VS Code's extension api (types [here](https://github.com/microsoft/vscode/blob/main/src/vscode-dts/vscode.d.ts), docs [here](https://code.visualstudio.com/api)).

This part of the prototype is the least fleshed out and I will add more docs soon...

# Open questions

- I would love to get more Intellisense for bindings in general. Still brainstorming how to do that
- Are we fine forcing users to install/manage a separate node module? I think so, but definitely worth discussing.
