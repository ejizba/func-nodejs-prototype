// import { app } from "@azure/functions";

// app.get('httpTrigger1',  async () => {
//     // some HTTP trigger function
//     return {}
// });

// app.durable.orchestration('DurableFunctionOrchestratorJS', function* (context) {
//     const outputs = []

//     outputs.push(yield context.df.callActivity("Hello", "Tokyo"));
//     outputs.push(yield context.df.callActivity("Hello", "Seattle"));

//     return outputs;
// });

// // Or, since it's  all in the SDK, we  can pass the generator function directly
// df.app.registerOrchestration('DurableFunctionOrchestratorJS', function* (context) {
//     const outputs = []

//     outputs.push(yield context.df.callActivity("Hello", "Tokyo"));
//     outputs.push(yield context.df.callActivity("Hello", "Seattle"));

//     return outputs;
// })