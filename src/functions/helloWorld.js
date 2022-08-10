async function helloWorld(context, request) {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    return { body: `Hello, ${name}!` };
};

module.exports = { helloWorld };
