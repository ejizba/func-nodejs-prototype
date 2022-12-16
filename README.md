# Azure Functions Node.js Framework v4 - Sample App

This repository contains a sample app for the [new Node.js framework for Azure Functions](https://aka.ms/AzFuncNodeV4). The default "main" branch uses TypeScript, but you may switch to the "main-js" branch for the same app using just JavaScript.

## Prerequisites

- Node.js v18+
- TypeScript v4+
- Azure Functions Host v4.14+
- Azure Functions Core Tools v4.0.4915+ (if running locally)
- Extension bundle v3.15+ (if using non-http triggers)

## Setup

1. Clone this repository
1. Add a `local.settings.json` file with the following contents:

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "FUNCTIONS_WORKER_RUNTIME": "node",
            "AzureWebJobsFeatureFlags": "EnableWorkerIndexing",
            "AzureWebJobsStorage": ""
        }
    }
    ```

1. Run `npm install`
1. Run `npm start`
1. Voila ✨ you have a running function app!

### Steps to enable more Azure triggers

The default configuration in this repository only enables an http and timer trigger. Follow these steps to enable more functions:

1. Change the `main` field in your `package.json` to `dist/src/functions/*.js`
1. Add a `local.settings.json` file with the following contents:

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "FUNCTIONS_WORKER_RUNTIME": "node",
            "AzureWebJobsFeatureFlags": "EnableWorkerIndexing",
            "AzureWebJobsStorage": "",
            "storage_APPSETTING": "",
            "cosmosDB_APPSETTING": "",
            "serviceBus_APPSETTING": "",
            "eventHub_APPSETTING": ""
        }
    }
    ```

1. Fill in the value for a connection string in your `local.settings.json` for the specific type of resource you want to try out. You can skip any resource you do not want to use
1. Add an "extensionBundle" entry to your `host.json` file. The resulting file will look like this:

    ```json
    {
        "version": "2.0",
        "extensionBundle": {
            "id": "Microsoft.Azure.Functions.ExtensionBundle",
            "version": "[2.*, 3.0.0)"
        }
    }
    ```

1. There is a bug in the current extension bundle resulting in the error `Microsoft.Azure.WebJobs.Script: _dispatcher.`. Until that is fixed you must remove the "NetheriteProviderStartup" entry in the following file: `~/.azure-functions-core-tools/Functions/ExtensionBundles/Microsoft.Azure.Functions.ExtensionBundle/2.13.0/bin/extensions.json`
1. Run `npm start`!
1. If you trigger the `helloWorldWithExtraOutputs` function, it will set an output binding which triggers the other azure resource functions

## More details

See here for more information: https://aka.ms/AzFuncNodeV4