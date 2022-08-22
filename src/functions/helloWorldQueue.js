const { app, output } = require('@azure/functions');

const queueOutput = output.storageQueue({ queueName: 'helloworldqueue', connection: 'storage_APPSETTING' });
app.http('helloWorldQueue', {
    authLevel: "function",
    methods: ["get", "post"],
    extraOutputs: [queueOutput],
    handler: async (context, request) => {
        context.log(`RequestUrl=${request.url}`);

        const name = request.query.get('name') || await request.text() || 'world';

        context.extraOutputs.set(queueOutput, { name });

        return { body: `Hello, ${name}!` };
    }
});