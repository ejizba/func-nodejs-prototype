module.exports.triggerOptions = { authLevel: 'anonymous' };
module.exports.outputOptions = { name: 'res' };

module.exports.callback = async function (context, req) {
    context.log(`RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    return {
        body: `Hello, ${name}!`
    };
};