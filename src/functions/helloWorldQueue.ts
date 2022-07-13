import { Binding, HttpInputBinding, HttpOutputBinding, InvocationContext, QueueOutputBinding } from "@azure/functions-option1";

const reqBinding = new HttpInputBinding({
    authLevel: "anonymous",
    methods: [
        "get",
        "post"
    ]
});
const resBinding = new HttpOutputBinding();
const queueBinding = new QueueOutputBinding({
    queueName: 'testQueue',
    connection: 'storage_APPSETTING'
});

export const helloWorldQueueBindings: Binding[] = [reqBinding, resBinding, queueBinding];

export async function helloWorldQueue(context: InvocationContext): Promise<void> {
    const req = reqBinding.get(context);

    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    resBinding.set(context, {
        body: `Hello, ${name}!`
    });
    queueBinding.set(context, { name });
};