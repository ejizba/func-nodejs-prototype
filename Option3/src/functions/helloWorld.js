module.exports.callback = async function (context, req, res) {
    context.log(`HTTP trigger function processed a request. RequestUrl=${req.url}`);

    const name = req.query.name || req.body || 'world';
    res.send(`Hello, ${name}!`);
};