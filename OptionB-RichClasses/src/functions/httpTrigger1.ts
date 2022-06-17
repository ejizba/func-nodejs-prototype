import { Binding, HttpInputBinding, HttpOutputBinding, HttpResponse, InvocationContext } from "@azure/functions-newB";

const reqBinding = new HttpInputBinding({
    authLevel: "anonymous",
    methods: [
        "get",
        "post"
    ]
});
const resBinding = new HttpOutputBinding();

export const httpTrigger1Bindings: Binding[] = [reqBinding, resBinding];

export async function httpTrigger1(context: InvocationContext): Promise<HttpResponse> {
    const req = reqBinding.get(context);

    context.log(`HTTP trigger function processed a request. RequestUrl=${req.url}`);

    const name = req.query.name || req.body?.name || 'world';
    resBinding.set(context, {
        // status: 200, /* Defaults to 200 */
        body: `Hello, ${name}!`
    });
};