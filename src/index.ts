import { app } from "@azure/functions";
import { snooze, snoozeOptions } from "./functions/snooze";


app.timer('snooze', snooze, snoozeOptions);

app.get('helloWorldInline', async (context, request) => {
    context.log(`RequestUrl=${request.url}`);

    const name = request.query.name || request.body || 'world';

    return { body: `Hello, ${name}!` };
});