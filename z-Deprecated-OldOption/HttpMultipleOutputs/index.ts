import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    let retMsg = 'Hello, world!';
    return {
        httpResponse: {
            body: retMsg
        },
        queueOutput: retMsg
    };
};

export default httpTrigger;