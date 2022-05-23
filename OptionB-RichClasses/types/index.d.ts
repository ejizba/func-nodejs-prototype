declare module '@azure/functions-newB' {
    export namespace app {
        export function registerFunction(name: string, bindings: Binding[], callback: FunctionCallback): Function;
    }

    export type InvocationContext = {
        log(...args: any[]): void;
    };

    export type FunctionCallback = ((context: InvocationContext) => unknown);

    export abstract class Binding {

    }

    export abstract class HttpBinding extends Binding {

    }

    export class HttpInputBinding extends HttpBinding {
        constructor(name: string, options?: {});
        get(context: InvocationContext): HttpRequest;
    }

    export class HttpOutputBinding extends HttpBinding {
        constructor(name: string, options?: {});
        set(context: InvocationContext, response: HttpResponse): void;
    }

    export type HttpRequest = any;

    export type HttpResponse = any;
}
