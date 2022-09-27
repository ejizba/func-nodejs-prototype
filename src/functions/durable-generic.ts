import { app, HttpRequest, input, InvocationContext, trigger } from "@azure/functions";
import * as df from "durable-functions";

app.generic('DurableFunctionsOrchestratorJS', {
    trigger: trigger.generic({
        type: 'orchestrationTrigger'
    }),
    handler: df.orchestrator(function* (context) {
        const outputs = [];
        outputs.push(yield context.df.callActivity("Hello", "Tokyo"));
        outputs.push(yield context.df.callActivity("Hello", "Seattle"));
        outputs.push(yield context.df.callActivity("Hello", "Cairo"));
        
        return outputs;
    })
})

app.generic('Hello', {
    trigger: trigger.generic({
        type: 'activityTrigger',
    }),
    handler: async function(context: InvocationContext, name: string): Promise<string> {
        return `Hello ${name}`
    }
})

const clientInput = input.generic({
    type: 'orchestrationClient'
});

app.generic('DurableFunctionsHttpStart', {
    trigger: trigger.generic({
        type: 'httpTrigger',
        authLevel: 'function',
        route: 'orchestrators/{functionName}',
        methods: [
            'post', 'get'
        ],
    }),
    extraInputs: [clientInput],
    return: {name: "$return", type:'http'},
    handler: async function (context: InvocationContext, req: HttpRequest): Promise<any> {
        // @ts-expect-error: whatever
        const client = df.getClient(context, clientInput);
        const instanceId = await client.startNew(req.params.functionName, undefined, req.body);
    
        context.log(`Started orchestration with ID = '${instanceId}'.`);

        return client.createCheckStatusResponse(req, instanceId);
    }
})