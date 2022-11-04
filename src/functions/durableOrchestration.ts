import { HttpRequest, InvocationContext } from '@azure/functions';
import * as df from 'durable-functions';
import { DurableOrchestrationClient, IOrchestrationFunctionContext } from 'durable-functions/lib/src/classes';

// Replace with the name of your Durable Functions Activity
const activityName = 'Hello';

const orchestrator = function* (context: IOrchestrationFunctionContext) {
    const outputs = [];
    outputs.push(yield context.df.callActivity(activityName, 'Tokyo'));
    outputs.push(yield context.df.callActivity(activityName, 'Seattle'));
    outputs.push(yield context.df.callActivity(activityName, 'Cairo'));

    return outputs;
};
df.orchestration('durableOrchestrator1', orchestrator);

const helloActivity = (_context: InvocationContext, input: string) => {
    return `Hello, ${input}`;
};
df.activity(activityName, helloActivity);

const clientHandler = async (context: InvocationContext, request: HttpRequest, client: DurableOrchestrationClient) => {
    const instanceId = await client.startNew(request.query.get('functionName'), undefined, request.body);
    context.log(`Started orchestration with ID = '${instanceId}'.`);
    return client.createCheckStatusResponse(request, instanceId);
};
df.httpClient('DurableFunctionsHttpStart', clientHandler);
