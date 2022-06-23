# Azure Functions 

Azure Functions is a serverless solution that allows you to write less code, maintain less infrastructure, and save on costs. Instead of worrying about deploying and maintaining servers, the cloud infrastructure provides all the up-to-date resources needed to keep your applications running.

You focus on the pieces of code that matter most to you, and Azure Functions handles the rest.

We often build systems to react to a series of critical events. Whether you're building a web API, responding to database changes, processing IoT data streams, or even managing message queues - every application needs a way to run some code as these events occur.

To meet this need, Azure Functions provides "compute on-demand" in two significant ways.

First, Azure Functions allows you to implement your system's logic into readily available blocks of code. These code blocks are called "functions". Different functions can run anytime you need to respond to critical events.

Second, as requests increase, Azure Functions meets the demand with as many resources and function instances as necessary - but only while needed. As requests fall, any extra resources and application instances drop off automatically.

Where do all the compute resources come from? Azure Functions provides as many or as few compute resources as needed to meet your application's demand.

## Scenarios

In many cases, a function integrates with an array of cloud services to provide feature-rich implementations.

The following are a common (but not exhaustive) set of scenarios for Azure Functions.

| If you want to... | then... |
| --- | --- |
| **Build a web API** | Implement an endpoint for your web applications using the HTTP trigger|
| **Process file uploads** | Run code when a file is uploaded or changed in blob storage
| **Respond to database changes** | Run custom logic when a document is created or updated in Cosmos DB |
| **Run scheduled tasks** | Execute code on pre-defined timed intervals |
| **Create reliable message queue systems** | Process message queues using Queue Storage, Service Bus, or Event Hubs |

## Triggers and bindings
Triggers cause a function to run. A trigger defines how a function is invoked and a function must have **exactly one** trigger. Triggers have associated data, which is often provided as the payload of the function.

Binding to a function is a way of declaratively connecting another resource to the function; bindings may be connected as input bindings, output bindings, or both. Data from bindings is provided to the function as parameters.

You can mix and match different bindings. Bindings are optional and a function might have one or multiple input and/or output bindings.

Suppose you want to write a new row to Azure Table storage whenever a new message appears in Azure Queue storage. This scenario can be implemented using an Azure Queue storage trigger and an Azure Table storage output binding.

Triggers and bindings let you avoid hardcoding access to other services. Your function receives data (for example, the content of a queue message) in function parameters. You send data (for example, to create a queue message) by using the return value of the function.

# Today's study
The goal of this study is to compare different programming model options we have for writing Node.js functions. You'll be asked to read some code and describe what it's doing and to make small changes to the code. (You won't have to run the code though.) Feel free to use Intellisense to help you, whenever that is available.  

## Initial questions
First, study the file structure in Option1. All options have same structure. What's your first impression? How is it similar/different from services you've used previously? How is it similar/different from your expectation?

Imagine each option is a Function App you're writing. Where would you start to understand what it's doing? 