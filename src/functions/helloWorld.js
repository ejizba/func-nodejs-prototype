const { input } = require('@azure/functions');

const helloWorldOptions = {
    trigger: input.http({ authLevel: "anonymous", methods: ["get", "post"] })
}

async function helloWorld(context, request) {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    return { body: `Hello, ${name}!` };
};

module.exports = { helloWorldOptions, helloWorld };
