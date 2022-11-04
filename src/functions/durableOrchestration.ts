import { HttpRequest, InvocationContext } from '@azure/functions';
import * as df from 'durable-functions';
import { DurableOrchestrationClient, IOrchestrationFunctionContext } from 'durable-functions/lib/src/classes';

const orchestrator = function* (context: IOrchestrationFunctionContext) {
    const outputs = [];
    outputs.push(yield context.df.callActivity('Hello', 'Tokyo'));
    outputs.push(yield context.df.callActivity('Hello', 'Seattle'));
    outputs.push(yield context.df.callActivity('Hello', 'Cairo'));

    return outputs;
};
df.orchestration('DurableFunctionsOrchestratorJS', orchestrator);

const helloActivity = (_context: InvocationContext, name: string) => {
    return `Hello, ${name}`;
};
df.activity('Hello', helloActivity);

const clientHandler = async (context: InvocationContext, req: HttpRequest, client: DurableOrchestrationClient) => {
    const instanceId = await client.startNew(req.query.get('functionName'), undefined, req.body);
    context.log(`Started orchestration with ID = '${instanceId}'.`);
    return client.createCheckStatusResponse(req, instanceId);
};
df.httpClient('DurableFunctionsHttpStart', clientHandler);
