# Azure Functions Node.js Framework v4 - Sample Durable Functions App

This "durable" branch contains a sample app for [Durable Functions](https://github.com/Azure/azure-functions-durable-js) using the [new Node.js framework for Azure Functions](https://aka.ms/AzFuncNodeV4). This branch uses TypeScript, but you may switch to the "durable-js" branch for the same app using just JavaScript.

## Prerequisites

-   Node.js v18+
-   TypeScript v4+
-   Durable Functions SDK v3.0.0-alpha.1+ (included in package.json)
-   Azure Functions Host v4.14+
-   Azure Functions Core Tools v4.0.4915+ (if running locally)

## Setup

1. Clone this repository and checkout the `durable` branch
1. Add a `local.settings.json` file with the following contents:

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "FUNCTIONS_WORKER_RUNTIME": "node",
            "AzureWebJobsFeatureFlags": "EnableWorkerIndexing",
            "AzureWebJobsStorage": "UseDevelopmentStorage=true"
        }
    }
    ```

1. Install and run the [local storage emulator](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite?tabs=visual-studio). Alternatively, you may set the [`AzureWebJobsStorage`](https://docs.microsoft.com/azure/azure-functions/functions-app-settings#azurewebjobsstorage) field in your `local.settings.json` to a connection string for a storage account in Azure.

1. Run `npm install`
1. Run `npm start`
1. Voila ✨ you have a running Durable Functions app!

### Troubleshooting

If your app is using extension bundles, you may see an error saying "The orchestrator can not execute without an OrchestratorStarted event" when you try to run any orchestration, as below:

```
Exception: The orchestrator can not execute without an OrchestratorStarted event.
Stack: TypeError: The orchestrator can not execute without an OrchestratorStarted event.
    at Function.ensureNonNull (C:\Users\hossamnasr\ms\azure\durable\js-sdk\lib\src\utils.js:63:19)
    at Orchestrator.<anonymous> (C:\Users\hossamnasr\ms\azure\durable\js-sdk\lib\src\orchestrator.js:45:58)
    at Generator.next (<anonymous>)
    at C:\Users\hossamnasr\ms\azure\durable\js-sdk\lib\src\orchestrator.js:8:71
    at new Promise (<anonymous>)
    at __awaiter (C:\Users\hossamnasr\ms\azure\durable\js-sdk\lib\src\orchestrator.js:4:12)
    at Orchestrator.handle (C:\Users\hossamnasr\ms\azure\durable\js-sdk\lib\src\orchestrator.js:26:16)
    at C:\Users\hossamnasr\ms\azure\durable\js-sdk\lib\src\shim.js:18:22
    at Generator.next (<anonymous>)
    at C:\Users\hossamnasr\ms\azure\durable\js-sdk\lib\src\shim.js:8:71
```

See See https://github.com/Azure/azure-functions-durable-extension/issues/2338 and https://github.com/Azure/azure-functions-durable-js/issues/409 for more details. If this happens, make sure you aren't using extension bundles and instead manually installing extensions in `extension.csproj`. For more instructions on how to manually install extensions using core tools and how to use the `extensions.csproj` file, see the guides [here](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v4%2Cwindows%2Ccsharp%2Cportal%2Cbash#install-extensions) and [here](https://learn.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-azure-function-app-settings?tabs=portal#manually-install-extensions).

1. Make sure your `host.json` file does _not_ include references to extensionBundles.

1. Make sure there is an `extensions.csproj` at the root directory of the app, and that it includes references to all the extensions the app requires.

1. If running your app using core tools directly, make sure you run `func extensions install` to install the extensions referenced in `extensions.csproj` before running `func start`.

### Steps to enable more Azure triggers

The default configuration in this branch only support http, timer, and durable triggers. This is because this branch does not use extension bundles, but instead relies on using an `extensions.csproj` and `func extensions install` (if running locally) to install only the specific extensions needed for the app. See the above section for more details. Until https://github.com/Azure/azure-functions-durable-extension/issues/2338 is fixed, please add any extensions you need (e.g., Storage, EventHub, Service Bus) to the provided `extensins.csproj` file.
