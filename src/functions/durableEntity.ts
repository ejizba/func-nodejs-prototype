import { app, HttpRequest, InvocationContext, output, trigger } from '@azure/functions';
import * as df from 'durable-functions';
import { IEntityFunctionContext } from 'durable-functions/lib/src/ientityfunctioncontext';

const clientInput = df.input.client();
app.generic('DurableFunctionsEntityHTTPStart', {
    trigger: trigger.http({
        route: 'Counter/{id}'
    }),
    extraInputs: [clientInput],
    return: output.http({}),
    handler: async function (context: InvocationContext, req: HttpRequest): Promise<any> {
        const client = df.getClient(context, clientInput);
        const id: string = req.params.id;
        const entityId = new df.EntityId('Counter', id);

        if (req.method === 'POST') {
            // increment value
            await client.signalEntity(entityId, 'add', 1);
        } else {
            // read current state of entity
            const stateResponse = await client.readEntityState<number>(entityId);
            return {
                body: stateResponse.entityState
            };
        }
    }
});

app.generic('Counter', {
    trigger: df.trigger.entity(),
    handler: df.createEntityFunction(function (context: IEntityFunctionContext<number>) {
        const currentValue: number = context.df.getState(() => 0);
        switch (context.df.operationName) {
            case 'add':
                const amount: number = context.df.getInput();
                context.df.setState(currentValue + amount);
                break;
            case 'reset':
                context.df.setState(0);
                break;
        }
    })
});
