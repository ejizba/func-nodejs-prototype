const { app, input, output } = require('@azure/functions');

const queueOutput = output.queue({ queueName: 'helloworldqueue', connection: 'storage_APPSETTING' });
app.get('helloWorldQueue', {
    authLevel: "function",
    methods: ["get", "put"],
    extraOutputs: [queueOutput],
    handler: async (context, request) => {
        context.log(`RequestUrl=${request.url}`);

        const name = request.query.name || request.body || 'world';

        context.extraOutputs.set(queueOutput, { name });

        return { body: `Hello, ${name}!` };
    }
});