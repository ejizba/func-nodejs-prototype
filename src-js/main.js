const httpTrigger1 = require('./functions/httpTrigger1').default;
const { app } = require('@azure/functions-new');

app.registerHttpFunction('HttpTrigger1', { name: 'req', authLevel: 'anonymous' }, httpTrigger1)
    .registerHttpOutput({ name: 'res' });