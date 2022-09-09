const { app } = require('@azure/functions');

async function helloWorld1(context, request) {
    context.log(`Http function processed request for url "${request.url}"`);

    const name = request.query.get('name') || await request.text() || 'world';

    return { body: `Hello, ${name}!` };
};

app.http('helloWorld1', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: helloWorld1
});

module.exports = { helloWorld1 };
