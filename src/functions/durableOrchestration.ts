import { HttpRequest, InvocationContext } from '@azure/functions';
import * as df from 'durable-functions';
import { ActivityHandler, DurableClientHandler, OrchestrationHandler } from 'durable-functions';

// Replace with the name of your Durable Functions Activity
const activityName = 'hello';

const orchestrator: OrchestrationHandler = function* (context) {
    const outputs = [];
    outputs.push(yield context.df.callActivity(activityName, 'Tokyo'));
    outputs.push(yield context.df.callActivity(activityName, 'Seattle'));
    outputs.push(yield context.df.callActivity(activityName, 'Cairo'));

    return outputs;
};
df.orchestration('durableOrchestrator1', orchestrator);

const helloActivity: ActivityHandler<string> = (_context: InvocationContext, input: string) => {
    return `Hello, ${input}`;
};
df.activity<string>(activityName, helloActivity);

const clientHandler: DurableClientHandler = async (context: InvocationContext, request: HttpRequest, client) => {
    const instanceId = await client.startNew(request.query.get('functionName'), undefined, request.text());
    context.log(`Started orchestration with ID = '${instanceId}'.`);
    return client.createCheckStatusResponse(request, instanceId);
};
df.httpClient('durableOrchestrationStart1', clientHandler);
