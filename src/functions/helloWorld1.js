const { app } = require('@azure/functions');

app.http('helloWorld1', {
    methods: ['GET', 'POST'],
    handler: async (context, request) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';

        return { body: `Hello, ${name}!` };
    }
});
