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

### Steps to enable more Azure triggers

The default configuration in this branch only support http, timer, and durable triggers. This is because this branch does not use extension bundles, but instead relies on using an `extensions.csproj` and `func extensions install` (if running locally) to install only the specific extensions needed for the app. This is because there is currently an issue affecting using the new programming model with extension bundles. See the issue here for more details: https://github.com/Azure/azure-functions-durable-extension/issues/2338. Until https://github.com/Azure/azure-functions-durable-extension/issues/2338 is fixed, please add any extensions you need (e.g., Storage, EventHub, Service Bus) to the provided `extensins.csproj` file.
