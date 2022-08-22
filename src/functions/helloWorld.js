const { app } = require('@azure/functions');

app.get('helloWorld', async (context, request) => {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.get('name') || await request.text() || 'world';

    return { body: `Hello, ${name}!` };
});
