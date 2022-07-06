module.exports.callback = async function (context, req) {
    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';

    return {
        httpResponse: {
            body: `Hello, ${name}!`
        },
        queueOutput: { name }
    };
};