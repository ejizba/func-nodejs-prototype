import { HttpRequest, InvocationContext } from '@azure/functions';
import * as df from 'durable-functions';
import { DurableOrchestrationClient, IEntityFunctionContext } from 'durable-functions/lib/src/classes';

// Replace with your own Durable entity name
const entityName = 'Counter';

df.httpClient(
    'durableEntityStart1',
    async (_context: InvocationContext, req: HttpRequest, client: DurableOrchestrationClient) => {
        const id: string = req.query.get('id');
        const entityId = new df.EntityId(entityName, id);

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
);

df.entity(entityName, (context: IEntityFunctionContext<number>) => {
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
});
