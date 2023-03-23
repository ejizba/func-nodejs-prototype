# Azure Functions Node.js v4 Sample App

This repository contains a sample app for the new Node.js Programming Model. The default "main" branch uses TypeScript, but you may switch to the "main-js" branch for the same app using just JavaScript.

> _**Version 4 is currently in public preview! 🎉✨ Try it out and let us know what you think: <https://aka.ms/AzFuncNodeV4>**_

## Requirements

See [here](https://learn.microsoft.com/azure/azure-functions/functions-node-upgrade-v4#requirements)

## Setup

1. Clone this repository
1. Add a `local.settings.json` file with the following contents:

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "FUNCTIONS_WORKER_RUNTIME": "node",
            "AzureWebJobsFeatureFlags": "EnableWorkerIndexing",
            "AzureWebJobsStorage": "<INSERT CONNECTION STRING HERE>"
        }
    }
    ```

1. Add a connection string to the [`AzureWebJobsStorage`](https://docs.microsoft.com/azure/azure-functions/functions-app-settings#azurewebjobsstorage) setting in your `local.settings.json`. You may set it to `UseDevelopmentStorage=true` to use the [local storage emulator](https://docs.microsoft.com/azure/storage/common/storage-use-azurite) or you may set it to a connection string for a storage account in Azure.
1. Run `npm install`
1. Run `npm start`
1. Voila ✨ you have a running function app!

### Steps to enable more Azure triggers

The default configuration in this repository only enables an http and timer trigger. Follow these steps to enable more functions:

1. Change the `main` field in your `package.json` to `dist/src/functions/*.js`
1. Add the following entries to the "Values" object in your `local.settings.json`:

    ```json
    "storage_APPSETTING": "",
    "cosmosDB_APPSETTING": "",
    "serviceBus_APPSETTING": "",
    "eventHub_APPSETTING": ""
    ```

1. Fill in the value of the above entries with a connection string for the specific type of resource you want to try out. You can skip any resource you do not want to use
1. Run `npm start`!
1. If you trigger the `helloWorldWithExtraOutputs` function, it will set an output binding which triggers the other azure resource functions
