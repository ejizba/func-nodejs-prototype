import { HttpRequest, InvocationContext, output, trigger } from '@azure/functions';
import * as df from 'durable-functions';
import { ActivityHandler, DurableClientHandler, OrchestrationHandler } from 'durable-functions';

// Replace with the name of your Durable Functions Activity
const activityName = 'hello2';

const orchestrator: OrchestrationHandler = function* (context) {
    const outputs = [];
    outputs.push(yield context.df.callActivity(activityName, 'Tokyo'));
    outputs.push(yield context.df.callActivity(activityName, 'Seattle'));
    outputs.push(yield context.df.callActivity(activityName, 'Cairo'));

    return outputs;
};
df.orchestration('durableOrchestrator2', orchestrator);

const helloActivity: ActivityHandler<string> = (_context: InvocationContext, input: string) => {
    return `Hello, ${input}`;
};
df.activityComplex<string>(activityName, {
    extraInputs: [], // could be used to add extra inputs
    extraOutputs: [], // could be used to add extra outputs
    handler: helloActivity,
});

const clientHandler: DurableClientHandler = async (context: InvocationContext, request: HttpRequest, client) => {
    const instanceId = await client.startNew(request.params.orchestratorName, undefined, request.text());
    context.log(`Started orchestration with ID = '${instanceId}'.`);
    return client.createCheckStatusResponse(request, instanceId);
};

df.clientComplex('durableOrchestrationStart2', {
    trigger: trigger.http({
        route: 'orchestrators/{orchestratorName}',
    }),
    return: output.http({}),
    extraInputs: [], // could be used to add extra inputs
    extraOutputs: [], // could be used to add extra outputs
    handler: clientHandler,
});
