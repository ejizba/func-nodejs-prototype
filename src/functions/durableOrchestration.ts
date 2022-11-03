import { HttpRequest, InvocationContext } from "@azure/functions";
import * as df from "durable-functions";
import {
  DurableOrchestrationClient,
  IOrchestrationFunctionContext,
} from "durable-functions/lib/src/classes";

df.orchestration(
  "DurableFunctionsOrchestratorJS",
  function* (context: IOrchestrationFunctionContext) {
    const outputs = [];
    outputs.push(yield context.df.callActivity("Hello", "Tokyo"));
    outputs.push(yield context.df.callActivity("Hello", "Seattle"));
    outputs.push(yield context.df.callActivity("Hello", "Cairo"));

    return outputs;
  }
);

df.activity("Hello", (context: InvocationContext, name: string) => {
  return `Hello, ${name}`;
});

df.httpClient(
  "DurableFunctionsHttpStart",
  async (
    context: InvocationContext,
    req: HttpRequest,
    client: DurableOrchestrationClient
  ) => {
    const instanceId = await client.startNew(
      req.query.get("functionName"),
      undefined,
      req.body
    );
    context.log(`Started orchestration with ID = '${instanceId}'.`);
    return client.createCheckStatusResponse(req, instanceId);
  }
);
