import { Binding, HttpInputBinding, HttpOutputBinding, InvocationContext, QueueOutputBinding } from "@azure/functions-newB";

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

export const httpTriggerBindings: Binding[] = [reqBinding, resBinding, queueBinding];

export async function httpTrigger2(context: InvocationContext): Promise<void> {
    const req = reqBinding.get(context);

    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    resBinding.set(context, {
        body: `Hello, ${name}!`
    });
    queueBinding.set(context, { name });
};