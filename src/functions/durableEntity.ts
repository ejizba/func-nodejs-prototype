import { app, HttpHandler, HttpRequest, HttpResponse, InvocationContext } from '@azure/functions';
import * as df from 'durable-functions';
import { EntityHandler } from 'durable-functions';

// Replace with your own Durable entity name
const entityName = 'Counter';

const clientInput = df.input.durableClient();

const httpStart: HttpHandler = async (req: HttpRequest, context: InvocationContext) => {
    const id: string = req.params.id;
    const entityId = new df.EntityId(entityName, id);
    const client = df.getClient(context, clientInput);

    if (req.method === 'POST') {
        // increment value
        await client.signalEntity(entityId, 'add', 1);
    } else {
        // read current state of entity
        const stateResponse = await client.readEntityState(entityId);
        return new HttpResponse({
            jsonBody: stateResponse.entityState,
        });
    }
};
app.http('durableEntityStart1', {
    route: `${entityName}/{id}`,
    extraInputs: [clientInput],
    handler: httpStart,
});

const counterEntity: EntityHandler<number> = (context) => {
    const currentValue: number = context.df.getState(() => 0);
    switch (context.df.operationName) {
        case 'add':
            const amount: number = context.df.getInput();
            context.df.setState(currentValue + amount);
            break;
        case 'reset':
            context.df.setState(0);
            break;
        case 'get':
            context.df.return(currentValue);
            break;
    }
};
df.app.entity(entityName, counterEntity);
