import { HttpRequest, InvocationContext, output, trigger } from '@azure/functions';
import * as df from 'durable-functions';
import { DurableClientHandler, EntityHandler } from 'durable-functions';

// Replace with your own Durable entity name
const entityName = 'Counter';

const clientHandler: DurableClientHandler = async (_context: InvocationContext, req: HttpRequest, client) => {
    const id: string = req.params.id;
    const entityId = new df.EntityId(entityName, id);

    if (req.method === 'POST') {
        // increment value
        await client.signalEntity(entityId, 'add', 1);
    } else {
        // read current state of entity
        const stateResponse = await client.readEntityState(entityId);
        return {
            body: stateResponse.entityState,
        };
    }
};
df.client('durableEntityStart1', trigger.http({ route: 'entity/{id}' }), output.http({}), clientHandler);

const entityHandler: EntityHandler<number> = (context) => {
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
df.entity(entityName, entityHandler);
