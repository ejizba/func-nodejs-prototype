# Azure Functions Node.js Framework v4 - Sample App

This repository contains a sample app for the [new Node.js framework for Azure Functions](https://aka.ms/AzFuncNodeV4). The default "main" branch uses TypeScript, but you may switch to the "main-js" branch for the same app using just JavaScript.

## Prerequisites

- Node.js v18+
- TypeScript v4+

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
1. Run `npm start`!
1. If you trigger the `helloWorldWithExtraOutputs` function, it will set an output binding which triggers the other azure resource functions

## More details

See here for more information: https://aka.ms/AzFuncNodeV4