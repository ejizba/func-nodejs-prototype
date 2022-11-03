import { app, HttpRequest, InvocationContext, output, trigger } from '@azure/functions';
import * as df from 'durable-functions';
import { IOrchestrationFunctionContext } from 'durable-functions/lib/src/classes';

app.generic('DurableFunctionsOrchestratorJS', {
    trigger: df.trigger.orchestration(),
    handler: df.createOrchestrator(function* (context: IOrchestrationFunctionContext) {
        const outputs = [];
        outputs.push(yield context.df.callActivity('Hello', 'Tokyo'));
        outputs.push(yield context.df.callActivity('Hello', 'Seattle'));
        outputs.push(yield context.df.callActivity('Hello', 'Cairo'));

        return outputs;
    })
});

app.generic('Hello', {
    trigger: df.trigger.activity(),
    handler: async function (context: InvocationContext, name: string): Promise<string> {
        return `Hello ${name}`;
    }
});

const clientInput = df.input.client();
app.generic('DurableFunctionsHttpStart', {
    trigger: trigger.http({
        route: 'orchestrators/{functionName}'
    }),
    extraInputs: [clientInput],
    return: output.http({}),
    handler: async function (context: InvocationContext, req: HttpRequest): Promise<any> {
        const client = df.getClient(context, clientInput);
        const instanceId = await client.startNew(req.params.functionName, undefined, req.body);

        context.log(`Started orchestration with ID = ${instanceId}.`);

        return client.createCheckStatusResponse(req, instanceId);
    }
});
